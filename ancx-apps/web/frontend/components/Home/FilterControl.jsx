import {
  Filters,
  Button,
  ButtonGroup,
  Popover,
  Card,
  ChoiceList,
} from "@shopify/polaris";
import { StarFilledMinor, SortMinor } from "@shopify/polaris-icons";

const FilterControl = (props) => {
  const {
    queryValue,
    filters,
    handleQueryValueChange,
    handleQueryValueRemove,
    popover,
    setPopover,
    selected,
    handleSorted,
    sortedChoices,
  } = props;
  return (
    <>
      <Filters
        queryValue={queryValue}
        filters={filters}
        //   appliedFilters={appliedFilters}
        onQueryChange={handleQueryValueChange}
        onQueryClear={handleQueryValueRemove}
        //   onClearAll={handleClearAll}
      >
        <div style={{ paddingLeft: "8px" }}>
          <ButtonGroup>
            <Button
              icon={StarFilledMinor}
              disabled
              onClick={() => console.log("New filter saved")}
            >
              Saved
            </Button>
            <Popover
              autofocusTarget="first-node"
              activator={
                <Button icon={SortMinor} onClick={() => setPopover(!popover)}>
                  Sort
                </Button>
              }
              active={popover}
            >
              <Card sectioned>
                <ChoiceList
                  title="Sort by"
                  choices={sortedChoices}
                  selected={selected}
                  onChange={handleSorted}
                />
              </Card>
            </Popover>
          </ButtonGroup>
        </div>
      </Filters>
    </>
  );
};

export default FilterControl;
