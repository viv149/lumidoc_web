import React from 'react';
import UpdateBlogForm from '../../../../components/blog/UpdateBlog';

type PageProps = {
    params: Promise<{
      slug: string;
    }>;
};

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    return {
      title: `Edit Blog ${slug}`,
    };
}
  
export default async function Page({ params }: PageProps) {
    const { slug } = await params;
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/blogs/${slug}`, {
      method: 'GET',
      cache: 'no-store',
    });
  
    const resData = await response.json();
    const blogData = resData?.data;
  
    if (!blogData) return <p>Blog not found</p>;
  
    return <UpdateBlogForm blog={blogData} />;
} 