
import { MetaDataBuilder } from '@/classes';
import BlogDetails from '@/components/pages/blogs/blog-details/BlogDetails';

import blogStore from '@/store/blogStore';
import React from 'react'

export async function generateMetadata({ params }) {
  const { blogId } = params;
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const _signature = process.env.NEXT_PUBLIC_SIGN || '';
  const defaultMeta = {
    title: "Orifine | Single Blog",
    description: "Orifine | Single Blog",
  };

  try {
    const res = await fetch(`${baseurl}/metadata/blogs/${blogId}`, {
    // const res = await fetch(`${baseurl}/metadata/blogs/${'6893e8b7e14a407efd6f13de'}`, {
      cache: "no-store",
      headers: {
        'x-client-sign': _signature,
      }
    });

    if (!res.ok) throw new Error('Metadata fetch failed');

    const { success, data: metaFromApi } = await res.json();
    if (!success) throw new Error('API returned failure');

    // feed *only* the raw metadata object into your builder
    return new MetaDataBuilder(metaFromApi, {
      openGraph: true,
      twitter: true,
    }).build();
    
  } catch (err) {
    return new MetaDataBuilder(defaultMeta).build();
  }
}

const BlogDetailsPage = async ({ params }) => {
  const { blogId } = params;

  const [res, err] = await blogStore.getBlogFetch(blogId);
  // const [res, err] = await blogStore.getBlogFetch();

  // if (err) {
  //   return <p>blog not found.</p>;
  // }

  // if (!res) {
  //   return <p>Failed to load blog.</p>;
  // }

  // console.log({res, err});

  return (
    <div>
      <BlogDetails data={res}/>
    </div>
  )
}

export default BlogDetailsPage