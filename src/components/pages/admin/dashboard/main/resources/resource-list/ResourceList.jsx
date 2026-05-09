"use client";
import { LearnMoreBtn } from "@/components/utilityComponents";
import TablePagination from "@/components/utilityComponents/table/tablePagination/TablePagination";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import resourceStore from "@/store/resourceStore";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";
import { useSnapshot } from "valtio";
import DeleteDialog from "@/components/utilityComponents/DeleteDialog/DeleteDialog";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "react-toastify";

const categories = [
  "All Resources",
  "Micro-certifications",
  "Blog posts",
  "Podcasts",
  "Product Leader resources",
  "Artificial Intelligence",
];

export default function ResourceList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    const [categories, setCategories] = useState(["All Resources"]);
    const [selectedCategory, setSelectedCategory] = useState("All Resources");
    const [allResources, setAllResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);


      const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedResourceId, setSelectedResourceId] = useState(null);
 
    const resourceSnap = useSnapshot(resourceStore);
  
    //  Fetch all resources
    async function fetchAllAdminResources() {
      try {
        setLoading(true);
        const [resp, err] = await resourceStore.getAllAdminResources();
  
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
      fetchAllAdminResources();
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

   
  
    //  Load More
    const handleLoadMore = () => {
      setVisibleCount((prev) => prev + 6);
    };
  
    const visibleResources = filteredResources.slice(0, visibleCount);


async function handleDeleteConfirm() {
  if (!selectedResourceId) return;

  
  const [data, error] = await resourceStore.deleteResource(selectedResourceId);

  if (error) {
    toast.error(error);
    return;
  }

  toast.success("Resource deleted successfully!");


  setAllResources(prev => {
    const updated = prev.filter(
      (r) => r._id?.toString() !== selectedResourceId?.toString()
    );
    return updated;
  });


  setFilteredResources(prev => {
    const updated = prev.filter(
      (r) => r._id?.toString() !== selectedResourceId?.toString()
    );
    return updated;
  });


  setOpenDeleteModal(false);
  setSelectedResourceId(null);
}



  return (
   <>

    <DeleteDialog
           open={openDeleteModal}
           title="Delete Resource?"
           description="Are you sure you want to delete this resource? This action cannot be undone."
           onConfirm={handleDeleteConfirm}
           onCancel={() => setOpenDeleteModal(false)}
         />
    <section >
   
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
                <div className="relative w-full h-56">
  <img
    src={baseUrl + resource?.image}
    alt={resource.title}
    className="w-full h-full object-cover"
  />

  {resource.status === "draft" && (
    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
      Not Published
    </span>
  )}
</div>

                 <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-between justify-between gap-2">
                      <Link href={`/admin/resources/update/${resource.slug}`} title="Edit/Update Resource">
                   <h3 className="text-20 font-semibold text-primary mt-2 mb-2 line-clamp-2 hover:underline">
                     {resource.title}
                   </h3></Link>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Link
                        href={`/admin/resources/update/${resource.slug}`}
                        className="text-gray-500 hover:text-gray-700 transition p-1 cursor-pointer"
                        title="Edit Resource"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedResourceId(resource._id);
                          setOpenDeleteModal(true);
                        }}
                        className="text-red-500 hover:text-red-600 transition p-1 cursor-pointer"
                        title="Delete Resource"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                      </div>
                   <Link href={`/admin/resources/update/${resource.slug }`} title="Edit/Update Resource">
                   <p className="text-secondary flex-grow line-clamp-3">
                     {resource.resourceDescription}
                   </p></Link>
                   <Link href={`/resources/${resource.slug}`} target="_blank">
                     <FlexibleButton
                       label="Preview"
                       iconName="book"
                       variant="outline"
                       className="mt-4 w-full"
                     />
                   </Link>
                 </div>
               </div>
             ))}
           </div>
         ) :
          (
         
            <div className="w-full py-20 flex flex-col items-center justify-center text-center">
              <div className="text-gray-400 mb-4">
                <Trash2 className="w-12 h-12 opacity-40" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Resources Available
              </h3>
              <p className="text-gray-500 max-w-sm mb-6">
                There are currently no resources added. You can create a new resource to get started.
              </p>
              <Link href="/admin/resources/create-new-resource">
                <FlexibleButton
                  label="Create New Resource"
                  variant="outline"
                  className="px-6"
                />
              </Link>
            </div>
          )
         }
   
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
   </>
  );
}
