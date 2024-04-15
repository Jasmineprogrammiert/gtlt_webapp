import Link from 'next/link'
import { client } from '@/app/lib/sanity'
import { fullProduct } from '@/app/interface'
// components
import ImgGallery from './components/ImgGallery'
import CountdownTimer from './components/CountdownTimer'
import ProductDetail from './components/ProductDetail'
import HealthScores from './components/HealthScores'
// styles
import { Star } from '@mui/icons-material'
import AddToBag from './components/AddToBag'

async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0] {
    _id,
      name,
      price,
      price_2,
      stock,
      "category": category->name,
      subtitle_1,
      description_1,
      subtitle_2,
      description_2,
      price_id,
      price_2_id,
      images,
      "slug": slug.current,
  }`;
  const data = await client.fetch(query);
  
  return data;
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: {slug: string};
}) {
  const data: fullProduct = await getData(params.slug);
  return (
    <>
    <div className="p-20">
      <div className="grid grid-cols-2 gap-10 xl:gap-14">
        <ImgGallery images={data.images} />

        <div className="">
          <h2 className="text-2xl xl:text-3xl font-medium mb-2.5">
            {data.name}
          </h2>
          <span className="text-lg">
            {data.category}
          </span>
          <div className="text-sm flex items-center gap-5 mt-1.5 text-gray-800">
            <Link href="/products">
              <span className="text-sm">4.2</span>
              <Star className="h-4 w-4" />
            </Link>
            <span>14 Ratings</span>
          </div>

          <hr className="bg-gray-950 my-5" />

          <h3 className="text-lg font-medium text-gray-950 mb-1.5">
            {data.subtitle_1}
          </h3>
          <p className="text-base text-gray-700">
            {data.description_1}
          </p>
          <h3 className="text-lg font-medium text-gray-950 mb-1.5 mt-5">
            {data.subtitle_2}
          </h3>
          <p className="text-base text-gray-700 mb-5">
            {data.description_2}
          </p>
          <span className="text-sm text-gray-700">
            Shipping calculated at Checkout
          </span>

          {/* <hr className="border-dashed bg-gray-950 my-5" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <input type="radio" name="plan" id="planA" value="a" className="rounded-full h-5 w-5 border-gray-800" />
              <label htmlFor="planA" className="text-lg font-medium text-gray-800">
                3-month regular plan ($2250/month)
              </label>
            </div>
            <div className="flex gap-x-3 items-center">
              <span className="text-xl font-medium text-cyan-700">
                ${data.price} 
              </span>
            </div>
          </div>  */}

          <hr className="border-dashed bg-gray-950 my-5" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* <input type="radio" name="plan" id="planB" className="rounded-full h-5 w-5 border-gray-800" /> */}
              <label htmlFor="planB" className="text-lg font-medium text-gray-800">
                6-month regular plan ($1516/month)
              </label>
            </div>

            <div className="flex items-center gap-x-2">
              <span className="text-xl font-medium text-cyan-700">
                ${data.price_2} 
              </span>
              <span className="text-base line-through text-red-500">
                ${data.price_2 + 30}
              </span>
              <span className="ml-5"><CountdownTimer /></span>
            </div>
          </div>

          <hr className="border-dashed bg-gray-950 my-5" />
          {data.stock > 0 ? (
            <>
            <div className="flex gap-3">
              <AddToBag
                currency="HKD"
                description_1={data.description_1}
                image={data.images[0]}
                name={data.name}
                price={data.price_2}
                price_id={data.price_2_id}
                key={data._id}
              />
            </div>
            </>
            ) : 
            <>
            <p className="text-cyan-800 font-medium tracking-wide ml-0.5">
              Out of Stock
            </p>
            </>
          }
        </div>
      </div>
    </div>
    <ProductDetail />
    <HealthScores />
    </>
  )
}