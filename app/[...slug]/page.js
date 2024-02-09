import { BlockRenderer } from 'components/BlockRenderer'
import { getPage } from 'utils/getPage'
import { notFound } from 'next/navigation'

export default async function Page({params}) {
  const data = await getPage(params.slug.join('/'))
  if (!data) notFound()
  return <BlockRenderer blocks={data} />
}