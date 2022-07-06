// @ts-check
import { join } from "path";
import fs from "fs";
import express from "express";
// import "express-async-errors";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";

import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import { setupGDPRWebHooks } from "./gdpr.js";
import { BillingInterval } from "./helpers/ensure-billing.js";

import {
  CollectionListing,
  Page,
} from "@shopify/shopify-api/dist/rest-resources/2022-04/index.js";
import { Console } from "console";

const USE_ONLINE_TOKENS = true;
const TOP_LEVEL_OAUTH_COOKIE = "shopify_top_level_oauth";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

const versionFilePath = "./version.txt";
let templateVersion = "unknown";
if (fs.existsSync(versionFilePath)) {
  templateVersion = fs.readFileSync(versionFilePath, "utf8").trim();
}

// TODO: There should be provided by env vars
const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

const DB_PATH = `${process.cwd()}/database.sqlite`;

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: process.env.HOST.split("://")[0],
  API_VERSION: ApiVersion.April22,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
  USER_AGENT_PREFIX: `Node App Template/${templateVersion}`,
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
  path: "/api/webhooks",
  webhookHandler: async (topic, shop, body) =>
    delete ACTIVE_SHOPIFY_SHOPS[shop],
});

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const BILLING_SETTINGS = {
  required: false,
  // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
  // chargeName: "My Shopify One-Time Charge",
  // amount: 5.0,
  // currencyCode: "USD",
  // interval: BillingInterval.OneTime,
};

// This sets up the mandatory GDPR webhooks. You’ll need to fill in the endpoint
// in the “GDPR mandatory webhooks” section in the “App setup” tab, and customize
// the code when you store customer data.
//
// More details can be found on shopify.dev:
// https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks
setupGDPRWebHooks("/api/webhooks");

// export for test use only
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  billingSettings = BILLING_SETTINGS
) {
  const app = express();
  app.set("top-level-oauth-cookie", TOP_LEVEL_OAUTH_COOKIE);
  app.set("active-shopify-shops", ACTIVE_SHOPIFY_SHOPS);
  app.set("use-online-tokens", USE_ONLINE_TOKENS);

  app.use(express.json());
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app, {
    billing: billingSettings,
  });

  // --- ADDED CODE SEGMENT ---
  app.get("/api/pages", verifyRequest(app), async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    const allPages = await Page.all({
      session: test_session,
    });
    res.json(allPages);
  });

  app.post("/api/pages", verifyRequest(app), async (req, res) => {
    try {
      console.log("sth");
      const test_session = await Shopify.Utils.loadCurrentSession(req, res);
      const page = new Page({ session: test_session });
      const body = req.body;
      page.title = body.title;
      page.body_html = body.content;
      console.log(page);
      await page.save({});
      res.status(201).json(page);
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/pages/:id", verifyRequest(app), async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    const page = await Page.find({
      session: test_session,
      id: parseInt(req.params.id),
    });
    res.json(page);
  });

  app.get("/api/pages/count", verifyRequest(app), async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    const counter = await Page.count({
      session: test_session,
    });
    res.json(counter);
  });

  app.put("/api/pages/:id", verifyRequest(app), async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    const page = new Page({ session: test_session });
    const body = req.body;
    page.id = parseInt(req.params.id);
    page.title = body.title;
    page.body_html = body.content;
    await page.save();
    res.json(page);
  });

  app.delete("/api/pages", verifyRequest(app), async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    const pagesToDelete = req.body.map((id) =>
      Page.delete({ session: test_session, id: id })
    );
    await Promise.all(pagesToDelete);
    res.status(204).end();
  });

  app.delete("/api/pages/:id", verifyRequest(app), async (req, res) => {
    const test_session = await Shopify.Utils.loadCurrentSession(req, res);
    await Page.delete({
      session: test_session,
      id: parseInt(req.params.id),
    });
    res.status(204).end();
  });

  // ------------------------------------------------------------------

  app.post("/api/webhooks", async (req, res) => {
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
      if (!res.headersSent) {
        res.status(500).send(error.message);
      }
    }
  });

  // All endpoints after this point will require an active session
  app.use(
    "/api/*",
    verifyRequest(app, {
      billing: billingSettings,
    })
  );

  app.get("/api/products-count", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, true);
    const { Product } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );

    const countData = await Product.count({ session });
    res.status(200).send(countData);
  });

  app.post("/api/graphql", async (req, res) => {
    try {
      const response = await Shopify.Utils.graphqlProxy(req, res);
      res.status(200).send(response.body);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.use(express.json());

  app.use((req, res, next) => {
    const shop = req.query.shop;
    if (Shopify.Context.IS_EMBEDDED_APP && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${shop} https://admin.shopify.com;`
      );
    } else {
      res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
    }
    next();
  });

  if (isProd) {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    app.use(compression());
    app.use(serveStatic(PROD_INDEX_PATH));
  }

  app.use("/*", async (req, res, next) => {
    const shop = req.query.shop;

    // Detect whether we need to reinstall the app, any request from Shopify will
    // include a shop in the query parameters.
    if (app.get("active-shopify-shops")[shop] === undefined && shop) {
      res.redirect(`/api/auth?shop=${shop}`);
    } else {
      // res.set('X-Shopify-App-Nothing-To-See-Here', '1');
      const fs = await import("fs");
      const fallbackFile = join(
        isProd ? PROD_INDEX_PATH : DEV_INDEX_PATH,
        "index.html"
      );
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(fallbackFile));
    }
  });

  return { app };
}

if (!isTest) {
  createServer().then(({ app }) => app.listen(PORT));
}
