import Image from 'next/image';

export const Gallery = ({ items, cropImages, columns }) => {
  const columnWidth = 100 / columns

  return (
    <div className='flex flex-wrap max-w-5xl mx-auto'>
      {items.map((item) => (
        <div
          key={item.id}
          style={{ width: `${columnWidth}%` }}
          className='p-5 flex-grow relative'
        >
          <Image
            className={`${cropImages ? 'h-full' : ''}`}
            src={item.attributes.url}
            alt={item.attributes.alt || 'image'}
            width={item.attributes.width}
            height={item.attributes.height}
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
      ))}
    </div>
  )
}