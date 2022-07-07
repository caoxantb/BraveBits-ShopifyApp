import { useState, useCallback, useEffect } from "react";

import { useAppBridge } from "@shopify/app-bridge-react";

import { Tabs, ResourceList, ChoiceList, Spinner } from "@shopify/polaris";

import FilterControl from "./FilterControl";
import PagesTableItem from "./PagesTableItem";
import pageService from "../../services/pageService";

import { useRecoilState } from "recoil";
import allPagesAtom from "../../store/allPagesAtom";

import he from "he";
import dateParse from "../../helpers/dateParse";
import toDate from "../../helpers/toDate";

import { IPageMeta } from "../../interfaces/IPageMeta";

const PagesTable = () => {
  const app = useAppBridge();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [queryValue, setQueryValue] = useState<string>("");
  const [popover, setPopover] = useState<boolean>(false);
  const [sortSelected, setSortSelected] = useState<string[]>(["Newest update"]);
  const [visibilitySelected, setVisibilitySelected] = useState<string[]>([
    "Visible",
  ]);
  const [pages, setPages] = useRecoilState<IPageMeta[]>(allPagesAtom);
  const [copyPages, setCopyPages] = useState<IPageMeta[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    pageService.getAll(app).then((res) => {
      const items = res.map((r: any) => ({
        id: r.id,
        url: `/pages/${r.id}`,
        title: r.title,
        content: he.decode(
          r.body_html.replace("\n", " ").replace(/<[^>]+>/g, "")
        ),
        updatedAt: dateParse(r.updated_at),
        updatedAtDateType: toDate(r.updated_at),
      }));
      setPages(items);
      setCopyPages(items);
      setIsLoading(false);
    });
  }, []);

  const deleteMany = async () => {
    await pageService.deleteMany(app, selectedItems);
    const pagesAfterDeletion = pages.filter(
      (p: IPageMeta) => !selectedItems.includes(p.id)
    );
    setPages(pagesAfterDeletion);
    setCopyPages(pagesAfterDeletion);
    setSelectedItems([]);
  };

  const tabs = [
    {
      id: "all-pages",
      content: "All",
      panelID: "all-pages-content-1",
    },
  ];

  const bulkActions = [
    {
      content: "Make selected pages visible",
      onAction: () => console.log("Make selected pages visible"),
    },
    {
      content: "Hide selected pages",
      onAction: () => console.log("Hide selected pages"),
    },
    {
      content: "Delete selected pages",
      onAction: deleteMany,
    },
  ];

  const sortedChoices = [
    { label: "Newest update", value: "Newest update" },
    { label: "Oldest update", value: "Oldest update" },
    { label: "Title A-Z", value: "Title A-Z" },
    { label: "Title Z-A", value: "Title Z-A" },
  ];

  const handleQueryValueChange = (value: string) => {
    setQueryValue(value);
    const pagesFiltered = copyPages.filter(
      (p) => p.title.includes(value) || p.content.includes(value)
    );
    setPages(pagesFiltered);
  };
  const handleQueryValueRemove = () => {
    setQueryValue("");
    setPages(copyPages);
  };
  const handleSorted = (value: string[]) => {
    setSortSelected(value);
    let pagesToSort = [...pages];
    console.log(value);
    switch (value[0]) {
      case "Newest update":
        pagesToSort.sort(
          (page1: IPageMeta, page2: IPageMeta) =>
            page2.updatedAtDateType - page1.updatedAtDateType
        );
        break;
      case "Oldest update":
        pagesToSort.sort(
          (page1: IPageMeta, page2: IPageMeta) =>
            page1.updatedAtDateType - page2.updatedAtDateType
        );
        break;
      case "Title A-Z":
        pagesToSort.sort((page1: IPageMeta, page2: IPageMeta) =>
          page1.title.localeCompare(page2.title)
        );
        break;
      case "Title Z-A":
        pagesToSort.sort(
          (page1: IPageMeta, page2: IPageMeta) =>
            -1 * page1.title.localeCompare(page2.title)
        );
        console.log(pagesToSort);
    }
    console.log(pagesToSort);
    setPages(pagesToSort);
  };

  const handleVisiblilityChange = useCallback(
    (value: string[]) => setVisibilitySelected(value),
    []
  );
  const onSelectionChange = (value: string[]) => setSelectedItems(value);

  const renderItem = (item: IPageMeta) => <PagesTableItem item={item} />;

  const filters = [
    {
      key: "visibility",
      label: "Visibility",
      filter: (
        <ChoiceList
          title="Visibility"
          titleHidden
          choices={[
            { label: "Visible", value: "Visible" },
            { label: "Hidden", value: "Hidden" },
          ]}
          selected={visibilitySelected}
          onChange={handleVisiblilityChange}
        />
      ),
      shortcut: true,
    },
  ];

  const filterControl = (
    <FilterControl
      queryValue={queryValue}
      filters={filters}
      handleQueryValueChange={handleQueryValueChange}
      handleQueryValueRemove={handleQueryValueRemove}
      popover={popover}
      setPopover={setPopover}
      selected={sortSelected}
      handleSorted={handleSorted}
      sortedChoices={sortedChoices}
    />
  );

  return (
    <>
      {pages.length === 0 && isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "300px",
          }}
        >
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      ) : (
        <>
          <Tabs tabs={tabs} selected={selectedTab}></Tabs>
          <ResourceList
            resourceName={{
              singular: "page",
              plural: "pages",
            }}
            items={pages}
            renderItem={renderItem}
            selectedItems={selectedItems}
            onSelectionChange={onSelectionChange}
            filterControl={filterControl}
            bulkActions={bulkActions}
          ></ResourceList>
        </>
      )}
    </>
  );
};

export default PagesTable;
