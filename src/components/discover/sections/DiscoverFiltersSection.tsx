"use client";
import React, { useState } from "react";
import { Checkbox, Slider, Input, Button, Collapse } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { LuSearch } from "react-icons/lu";

const { Panel } = Collapse;

interface FiltersProps {
  onFilterChange?: (filters: any) => void;
}

export const DiscoverFiltersSection = ({ onFilterChange }: FiltersProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([
    "BlueBus",
  ]);
  const [selectedArrivalStations, setSelectedArrivalStations] = useState<
    string[]
  >([]);
  const [selectedDepartureStations, setSelectedDepartureStations] = useState<
    string[]
  >([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  const companies = [
    "BlueBus",
    "BlueBus 2",
    "BlueBus 3",
    "BlueBus 4",
    "BlueBus 5",
  ];

  const arrivalStations = ["الإسكندرية", "القاهرة", "أسوان", "الجيزة", "الأقصر"];

  const departureStations = ["الإسكندرية", "القاهرة", "أسوان", "الجيزة", "الأقصر"];

  const handleCompanyChange = (checkedValues: any) => {
    setSelectedCompanies(checkedValues);
  };

  const handleArrivalChange = (checkedValues: any) => {
    setSelectedArrivalStations(checkedValues);
  };

  const handleDepartureChange = (checkedValues: any) => {
    setSelectedDepartureStations(checkedValues);
  };

  return (
    <Collapse
      defaultActiveKey={["1", "2", "3", "4"]}
      ghost
      expandIcon={({ isActive }) => (
        <UpOutlined
          className={`text-gray-600 transition-transform ${
            isActive ? "" : "rotate-180"
          }`}
        />
      )}
      expandIconPosition="start"
      className="!w-full"
    >
      {/* Companies Filter */}
      <Panel
        header={
          <span className="text-base font-bold text-primary">الشركات</span>
        }
        key="1"
        className="border-b border-gray-200"
      >
        <div className="">
          {/* Search Input */}
          <div className="inputS1">
            <Input
              placeholder="بحث"
              prefix={<LuSearch className="text-[#819DAF]" />}
              className="mb-4"
            />
          </div>

          {/* Checkboxes */}
          <Checkbox.Group
            value={selectedCompanies}
            onChange={handleCompanyChange}
            className="w-full"
          >
            <div className="flex flex-col gap-3">
              {companies.map((company, index) => (
                <Checkbox
                  key={index}
                  value={company}
                  className="w-full flex  m-0"
                >
                  <span className="text-gray-700 mr-2">{company}</span>
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>

          <div className=" mt-3">
            <Button
              type="link"
              className="!text-primary !justify-start !p-0 h-auto"
              size="small"
            >
              المزيد
            </Button>
          </div>
        </div>
      </Panel>

      {/* Arrival Stations Filter */}
      <Panel
        header={
          <span className="text-base font-bold text-primary">محطات الوصول</span>
        }
        key="2"
        className="border-b border-gray-200"
      >
        <div className="">
          {/* Search Input */}
          <div className="inputS1">
            <Input
              placeholder="بحث"
              prefix={<LuSearch className="text-[#819DAF]" />}
              className="mb-4"
            />
          </div>

          {/* Checkboxes */}
          <Checkbox.Group
            value={selectedArrivalStations}
            onChange={handleArrivalChange}
            className="w-full"
          >
            <div className="flex flex-col gap-3">
              {arrivalStations.map((station, index) => (
                <Checkbox
                  key={index}
                  value={station}
                  className="w-full flex  m-0"
                >
                  <span className="text-gray-700 mr-2">{station}</span>
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>

          <div className=" mt-3">
            <Button
              type="link"
              className="!text-primary !justify-start !p-0 h-auto"
              size="small"
            >
              المزيد
            </Button>
          </div>
        </div>
      </Panel>

      {/* Departure Stations Filter */}
      <Panel
        header={
          <span className="text-base font-bold text-primary">
            محطات المغادرة
          </span>
        }
        key="3"
        className="border-b border-gray-200"
      >
        <div className="">
          {/* Search Input */}
          <div className="inputS1">
            <Input
              placeholder="بحث"
              prefix={<LuSearch className="text-[#819DAF]" />}
              className="mb-4"
            />
          </div>

          {/* Checkboxes */}
          <Checkbox.Group
            value={selectedDepartureStations}
            onChange={handleDepartureChange}
            className="w-full"
          >
            <div className="flex flex-col gap-3">
              {departureStations.map((station, index) => (
                <Checkbox
                  key={index}
                  value={station}
                  className="w-full flex  m-0"
                >
                  <span className="text-gray-700 mr-2">{station}</span>
                </Checkbox>
              ))}
            </div>
          </Checkbox.Group>

          <div className=" mt-3">
            <Button
              type="link"
              className="!text-primary !justify-start !p-0 h-auto"
              size="small"
            >
              المزيد
            </Button>
          </div>
        </div>
      </Panel>

      {/* Price Range Filter */}
      <Panel
        header={
          <span className="text-base font-bold text-primary">نطاق الأسعار</span>
        }
        key="4"
      >
        <div className="">
          {/* Price Display */}
          <div className="text-center text-sm text-gray-500 mb-4">
            ر.س (0-10000000)
          </div>

          {/* Slider */}
          <Slider
            range
            min={0}
            max={1000000}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            styles={{
              track: { backgroundColor: "#0074C3" },
              tracks: { backgroundColor: "#0074C3" },
              rail: { backgroundColor: "#e5e7eb" },
            }}
            tooltip={{ formatter: (value) => `${value} ر.س` }}
            className="mb-6"
          />

          {/* Price Inputs */}
          <div className="flex items-center gap-2">
            <div>
              <label className="text-sm text-gray-600 block  mb-1">من</label>
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="text-center"
                size="large"
              />
            </div>
            <div className="text-center text-gray-400 text-lg mt-[23px]">-</div>
            <div>
              <label className="text-sm text-gray-600 block  mb-1">إلى</label>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="text-center"
                size="large"
              />
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};
