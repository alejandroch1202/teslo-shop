import Image from 'next/image'

interface Props {
  src?: string
  alt: string
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style']
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  width: number
  height: number
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height
}: Props) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg'

  return (
    <Image
      src={localSrc}
      alt={alt}
      style={style}
      width={width}
      height={height}
      className={className}
    />
  )
}
