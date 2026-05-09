"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSnapshot } from "valtio";
import resourceStore from "@/store/resourceStore";
import { toast } from "react-toastify";
import FlexibleButton from "@/components/utilityComponents/customBtns/FlexibleButton";
import Link from "next/link";
import CommonSkeleton from "@/components/utilityComponents/commonSkeleton/CommonSkeleton";
import { addBaseUrl } from "@/utils/cleanHtml";



const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function ResourceDetails() {
  const { resourceId } = useParams();
  const resourceSnap = useSnapshot(resourceStore);

  const [resource, setResource] = useState(null);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loadingResource, setLoadingResource] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // 🔹 Fetch single resource and related
  async function getSingleResource() {
    setLoadingResource(true);
    setLoadingRelated(true);

    const [response, err] = await resourceStore.getResource(resourceId, "q=related");

    if (err || !response) {
      toast.error(err || "Failed to fetch the resource");
      setLoadingResource(false);
      setLoadingRelated(false);
      return;
    }

    const { data, related } = response;

    if (data) setResource(data);
    if (related) setFilteredResources(related);

    setLoadingResource(false);
    setLoadingRelated(false);
  }

  useEffect(() => {
    if (!resourceId) return;
    getSingleResource();
  }, [resourceId]);

  // 🔹 Handle Get Template form
  async function onGetTemplate(e) {
    e.preventDefault();
    const emailValue = e.target[0].value;

    if (!emailValue || !emailRegex.test(emailValue)) {
      toast.error("Please enter a valid email");
      return;
    }

    const obj = { email: emailValue };
    const [result, error] = await resourceStore.downloadResource(resourceId, obj);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(result?.message || "The Resource has been sent to your email!");
    e.target[0].value = "";
  }
console.log(filteredResources,'chcek')
  return (
    <section className="ca-resource-details component-gap-y component-gap-x">

      {/* Banner */}
      {loadingResource ? (
        <CommonSkeleton type="banner" className="mb-6" />
      ) : (
        <img
          src={baseUrl + resource?.image}
          alt={resource?.title}
          width={500}
          height={200}
          className="banner-image mb-6"
        />
      )}

      {/* Resource Content */}
      {loadingResource ? (
        <CommonSkeleton type="content" className="mb-8" />
      ) : (
        <div className="resource-content">
          <h2>{resource?.title || ""}</h2>

          {resource?.description && (
            <div
              className="section"
              dangerouslySetInnerHTML={{ __html:  addBaseUrl(resource.description, baseUrl) }}
            />
          )}

          {resource?.tags?.length > 0 && (
            <div className="tags mt-3">
              <strong>Tags:</strong> {resource.tags.join(", ")}
            </div>
          )}

          <div className="hr my-6" id="comparison-template"></div>

          {/* Comparison / Download Section */}
          <div className="comparison-template grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="left">
              <h3>{resource?.resourceTitle || ""}</h3>
              <p>{resource?.resourceDescription || ""}</p>
              <form
                className="newsletter-form items-stretch gap-3 w-full mt-4"
                onSubmit={onGetTemplate}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full block px-4 py-2 rounded-3xl text-[1rem] text-[#9D9385] font-semibold border"
                />
                <button type="submit" className="btn-primary">
                  Get Template
                </button>
              </form>
            </div>

            <div className="right">
              {loadingResource ? (
                <CommonSkeleton type="banner" className="h-48" />
              ) : (
                <img
                  src={baseUrl + resource?.featuredImage}
                  alt={resource?.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Related Resources */}
      <h1 className="related-resources mt-12 mb-6">Related Resources</h1>

      {loadingRelated ? (
        <CommonSkeleton type="cards" count={3} />
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredResources.slice(0, 3).map((res) => (
            <div
              key={res._id}
              className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <img
                src={baseUrl + res?.image}
                alt={res.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-20 font-semibold text-primary mt-2 mb-2 line-clamp-2">
                  {res.title}
                </h3>
                <p className="text-secondary flex-grow line-clamp-3">
                  {res.resourceDescription}
                </p>
                <Link href={`/resources/${res.slug}`}>
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
          No related resources found.
        </div>
      )}
    </section>
  );
}
