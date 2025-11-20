import React from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isAdmin?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isAdmin = false }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 rounded-full bg-gray-800 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Sold Out
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <p className="text-xs font-medium text-gray-500">{product.category}</p>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1" title={product.name}>
            {product.name}
          </h3>
        </div>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2" title={product.description}>
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
          {!isAdmin && (
            <Button 
              size="sm" 
              onClick={() => onAddToCart(product)} 
              disabled={product.stock === 0}
              className={product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <ShoppingBag className="mr-1.5 h-4 w-4" />
              {product.stock === 0 ? 'Out' : 'Add'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};