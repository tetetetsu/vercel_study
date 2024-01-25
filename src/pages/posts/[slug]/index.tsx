'use client';
// export default function Page({ params }: { params: { slug: string } }) {
//   return <div>posts: {params.slug}</div>;
// }


import { usePathname } from 'next/navigation';

export default function Page() {
	console.log("render")
	const Pathname = usePathname();
	return <h1 className="text-3xl font-bold">パス: {Pathname}</h1>;
}

