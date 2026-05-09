'use client';
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import caseStudyStore from '@/store/caseStudyStore';
import { Box } from '@/components/pages/landing/ProjectShowcase';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import DeleteDialog from '@/components/utilityComponents/DeleteDialog/DeleteDialog';
import { Trash2, Pencil } from 'lucide-react';
import { toast } from 'react-toastify';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const CaseStudiesList = () => {
  const snap = useSnapshot(caseStudyStore);
  const [projects, setProjects] = useState([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    caseStudyStore.getAllAdminProjects()
      .then(([data, error]) => {
        if (data) {
          setProjects(data);
          // console.log(data);
        };
        if (error) {
          // console.log(error)
        };
      })
  }, []);

  async function handleDeleteConfirm() {
    if (!selectedProjectId) return;

    const [data, error] = await caseStudyStore.deleteProject(selectedProjectId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Project deleted successfully!");
      setProjects(prev => prev.filter(p => p._id !== selectedProjectId));
    }

    setOpenDeleteModal(false);
    setSelectedProjectId(null);
  }

  return (
    <>
      <DeleteDialog
        open={openDeleteModal}
        title="Delete Project?"
        description="Are you sure you want to delete it? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setOpenDeleteModal(false)}
      />
      <section className="ca-case-studies !py-8">
        <div className="center">
          <div className="all-case-studies-card">
            {projects?.length > 0 ? projects.map((project, idx) => (
              <Box key={idx + "prj"} className="box00 relative">



                {project.status === "draft" && (
                  <span
                    className="
      absolute top-3 left-3 
      bg-yellow-500 text-white 
      text-xs font-semibold 
      px-3 py-1 
      rounded-full shadow-lg
      z-20
    "
                  >
                    Not Published
                  </span>
                )}


                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="
    absolute top-3 right-3 
    bg-gray-500 text-white 
    text-xs font-semibold 
    px-3 py-1 
    rounded-full shadow-lg
    z-20 flex items-center gap-1
  "
                >
                  <span>Preview</span>
                  <ArrowRight size={14} />
                </Link>


                <Link href={`/admin/case-studies/update/${project._id}`}>
                  <img
                    src={
                      project.featuredImage &&
                        (project.featuredImage.startsWith("https://") ||
                          project.featuredImage.startsWith("http://"))
                        ? project.featuredImage
                        : `${baseUrl}${project.featuredImage}`
                    }
                    alt={`${project.title} Project`}
                    width={500}
                    height={500}
                  />
                </Link>

                <div className="flex items-center justify-between gap-2">
                  <Link className='truncate max-w-[300px] whitespace-break-spaces' href={`/admin/case-studies/update/${project._id}`}>
                    <h5>{project.shortName}</h5>
                  </Link>

                  <div className="flex items-center gap-1 absolute bottom-12 right-3 relative z-500000">
                    <Link
                      href={`/admin/case-studies/update/${project._id}`}
                      className="text-gray-600 cursor-pointer rounded-sm transition p-1 hover:text-gray-800 hover:bg-black/20"
                      title="Edit Project"
                    >
                      <Pencil size={20} />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedProjectId(project._id);
                        setOpenDeleteModal(true);
                      }}
                      className="text-red-600 cursor-pointer rounded-sm transition p-1 hover:text-red-700 hover:bg-black/20"
                      title="Delete Project"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

              </Box>
            )) : (
              <div className="empty">
                <h2>No Projects Found</h2>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesList;
