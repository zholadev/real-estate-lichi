import React from 'react';
import FilterDistrict from "@/components/catalog/ui/filter/filterTypes/FilterDistrict";
import {
    apiGetFilterDistrictList, apiGetFilterPropertyTypeList,
    apiGetFilterResidenceList,
    apiGetFilterRoomsList, apiGetFilterTagsList
} from "@/shared/services/clientRequests";
import FilterResidence from "@/components/catalog/ui/filter/filterTypes/FilterResidence";
import FilterRooms from "@/components/catalog/ui/filter/filterTypes/FilterRooms";
import FilterPropertyType from "@/components/catalog/ui/filter/filterTypes/FilterPropertyType";
import FilterTags from "@/components/catalog/ui/filter/filterTypes/FilterTags";
import {Input} from "@/shared/uikit/form/input";

/**
 * @author Zholaman Zhumanov
 * @created 04.01.2024
 * @param props
 * @todo refactoring
 * @returns {Element}
 * @constructor
 */
function FilterList(props) {
    const {
        i18n,
        clearSelects,
        queryFilter,
        setFilterQueryHandle,
        setApiFiltersHandle,
        checkDistrictValue,
        queryApiFilters,
        typeCatalog,
        getMinMaxPrices,
        priceFrom,
        setPriceFrom,
        priceValue,
        setPriceValue
    } = props

    return (
        <>
            <FilterDistrict
                i18n={i18n}
                filterType={"districts"}
                clearSelect={clearSelects}
                value={queryFilter?.["districts"]}
                filterApi={apiGetFilterDistrictList}
                assemblyFilter={setFilterQueryHandle}
                assemblyFilterApi={setApiFiltersHandle}
                defaultValue={queryFilter?.["districts"]}
                placeholder={i18n?.["site.district.title"]}
                filterApiParams={typeCatalog === 'residential_complex' ? {"filters[apartments][name][$notNull]": true, "filters[apartments][residence][name][$notNull]": true} : {"filters[apartments][name][$notNull]": true}}
            />

            {
                typeCatalog !== 'residential_complex' &&
                <FilterResidence
                    i18n={i18n}
                    filterType={"residence"}
                    value={queryFilter?.["residence"]}
                    clearSelect={clearSelects}
                    disabled={!queryFilter?.["districts"]}
                    filterApi={apiGetFilterResidenceList}
                    assemblyFilter={setFilterQueryHandle}
                    onClickContainer={checkDistrictValue}
                    assemblyFilterApi={setApiFiltersHandle}
                    placeholder={i18n?.["site.residence.title"]}
                    filterApiParams={queryApiFilters}
                />
            }

            <FilterRooms
                i18n={i18n}
                filterType={"rooms"}
                clearSelect={clearSelects}
                value={queryFilter?.["rooms"]}
                disabled={!queryFilter?.["districts"]}
                filterApi={apiGetFilterRoomsList}
                assemblyFilter={setFilterQueryHandle}
                onClickContainer={checkDistrictValue}
                assemblyFilterApi={setApiFiltersHandle}
                placeholder={i18n?.["site.roominess.title"]}
                filterApiParams={queryApiFilters}
            />

            <FilterPropertyType
                i18n={i18n}
                filterType={"property_types"}
                clearSelect={clearSelects}
                value={queryFilter?.["property_types"]}
                disabled={!queryFilter?.["districts"]}
                filterApi={apiGetFilterPropertyTypeList}
                assemblyFilter={setFilterQueryHandle}
                onClickContainer={checkDistrictValue}
                assemblyFilterApi={setApiFiltersHandle}
                placeholder={i18n?.["site.property.type.title"]}
                filterApiParams={queryApiFilters}
            />

            <FilterTags
                i18n={i18n}
                filterType={"tags"}
                value={queryFilter?.["tags"]}
                clearSelect={clearSelects}
                disabled={!queryFilter?.["districts"]}
                filterApi={apiGetFilterTagsList}
                assemblyFilter={setFilterQueryHandle}
                onClickContainer={checkDistrictValue}
                assemblyFilterApi={setApiFiltersHandle}
                placeholder={i18n?.["site.tags.title"]}
                filterApiParams={queryApiFilters}
            />

            <Input
                id={"price"}
                i18n={i18n}
                type={"number"}
                placeholder={Object.values(queryFilter || {}).length > 0 && getMinMaxPrices?.["min"] || i18n?.["site.coast.from.title"]}
                value={priceFrom}
                disabled={Object.values(queryFilter || {}).length > 0}
                onChange={(e) => {
                    setPriceFrom(e)
                    setFilterQueryHandle({key: "price.from", value: e})
                    setApiFiltersHandle({
                        key: "filters[apartments][price][$gte]",
                        value: e
                    })
                }}
                typeInput={'secondary'}
            />

            <Input
                id={"price"}
                i18n={i18n}
                type={"number"}
                placeholder={Object.values(queryFilter || {}).length > 0 && getMinMaxPrices?.["max"] || i18n?.["site.coast.to.title"]}
                value={priceValue}
                disabled={Object.values(queryFilter || {}).length > 0}
                onChange={(e) => {
                    setPriceValue(e)
                    setFilterQueryHandle(e)
                    setFilterQueryHandle({key: "price.to", value: e})
                    setApiFiltersHandle({
                        key: "filters[apartments][price][$lte]",
                        value: e
                    })
                }}
                typeInput={'secondary'}
            />
        </>
    );
}

export default FilterList;
