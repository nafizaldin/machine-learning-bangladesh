"use client";

import { useState, useEffect, useRef } from "react";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import Image from "next/image";
import Link from "next/link";
import resourceStore from "@/store/resourceStore";
import { useSnapshot } from "valtio";
import { toast } from "react-toastify";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Resources = () => {
  const [categories, setCategories] = useState(["All Resources"]);
  const [selectedCategory, setSelectedCategory] = useState("All Resources");
  const [allResources, setAllResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const tabsContainerRef = useRef(null);
  const resourceSnap = useSnapshot(resourceStore);

  //  Fetch all resources
  async function fetchAllResources() {
    try {
      setLoading(true);
      const [resp, err] = await resourceStore.getAllResources();

      if (err || !resp?.data) {
        toast.error(err || "Failed to fetch resources");
        setLoading(false);
        return;
      }

      const resources = resp.data || [];
      setAllResources(resources);
      setFilteredResources(resources);

      const uniqueCats = [
        ...new Set(resources.flatMap((r) => r.categories?.filter(Boolean) || [])),
      ];

      setCategories(["All Resources", ...uniqueCats]);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllResources();
  }, []);

  //  Handle Category Click
  const onCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(6);

    if (cat === "All Resources") {
      setFilteredResources(allResources);
    } else {
      const filtered = allResources.filter((resource) =>
        resource.categories?.some(
          (c) => c.toLowerCase() === cat.toLowerCase()
        )
      );
      setFilteredResources(filtered);
    }
  };

  //  Smooth scroll for tabs
  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  //  Handle Arrow Click (tab navigation)
  const handleArrowClick = (direction) => {
    const currentIndex = categories.indexOf(selectedCategory);
    let newIndex;

    if (direction === "left") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else {
      newIndex =
        currentIndex < categories.length - 1
          ? currentIndex + 1
          : categories.length - 1;
    }

    const newCategory = categories[newIndex];
    onCategoryClick(newCategory);
    scrollTabs(direction);
  };

  //  Load More
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleResources = filteredResources.slice(0, visibleCount);

  return (
    <section className="component-gap-y component-gap-x">
      {/* Header */}
      <div className="text-center max-w-[745px] mx-auto mb-16">
        <h1 className="heading-56 text-primary leading-tight">
          Resources to Learn, Grow &amp; Build
        </h1>
        <p className="subheading-24 text-secondary mt-3">
          Curated guides, datasets, tools, and learning materials to help
          you advance in Machine Learning and AI.
        </p>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
        <h2 className="heading-56 text-primary mb-4 lg:mb-0">
          Knowledge Hub
        </h2>

        <div className="flex items-center gap-2 w-full lg:w-auto justify-between">
          {/* Left Arrow */}
          <button
            onClick={() => handleArrowClick("left")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Image
              src="/images/landing-page/arrow-left.png"
              alt="left arrow"
              width={30}
              height={30}
            />
          </button>

          {/* Tabs */}
          <div
            ref={tabsContainerRef}
            className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full justify-start"
          >
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => onCategoryClick(tab)}
                className={`whitespace-nowrap px-5 py-3 rounded-full text-sm transition-all duration-200 ${
                  selectedCategory === tab
                    ? "bg-[#4285F4] text-white font-semibold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleArrowClick("right")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Image
              src="/images/landing-page/arrow-right.png"
              alt="right arrow"
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>

      {/*  Resources Grid with Skeleton */}
      {loading ? (
        <CommonSkeleton count={3} />
      ) : visibleResources.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleResources.map((resource) => (
            <div
              key={resource._id}
              className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <img
                src={baseUrl + resource?.image}
                alt={resource.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-20 font-semibold text-primary mt-2 mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                <p className="text-secondary flex-grow line-clamp-3">
                  {resource.resourceDescription}
                </p>
                <Link href={`/resources/${resource.slug}`}>
                  <FlexibleButton
                    label="Explore More"
                    iconName="book"
                    variant="outline"
                    className="mt-4 w-full"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg font-medium mt-10">
          No resources found.
        </div>
      )}

      {/* Load More Button */}
      {!loading && visibleCount < filteredResources.length && (
        <div className="flex justify-center mt-12">
          <FlexibleButton
            label="Check All Resources"
            iconName="document"
            variant="outline"
            className="text-16"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </section>
  );
};

export default Resources;
