import React from 'react';

interface ProductVisualProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const FALLBACK_IMAGE = '/assets/images/product-families-flatlay.webp';

export const ProductVisual: React.FC<ProductVisualProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  fetchPriority,
  width = 1200,
  height = 900,
  children,
}) => {
  const usesEditorialMat = src.includes('/products_commodity_');

  const useFallback = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.dataset.fallback === 'true') return;
    image.dataset.fallback = 'true';
    image.src = FALLBACK_IMAGE;
    image.classList.remove('product-visual__image--matted');
    image.classList.add('product-visual__image--cover');
  };

  return (
    <div className={`product-visual ${usesEditorialMat ? 'product-visual--matted' : 'product-visual--cover'} ${className}`}>
      {usesEditorialMat && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading={loading}
          decoding="async"
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
          className="product-visual__ambient"
        />
      )}
      <div className="product-visual__wash" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onError={useFallback}
        className={`product-visual__image ${usesEditorialMat ? 'product-visual__image--matted' : 'product-visual__image--cover'} ${imageClassName}`}
      />
      <div className="product-visual__finish" aria-hidden="true" />
      {children}
    </div>
  );
};
