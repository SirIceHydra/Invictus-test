import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const navigate = useNavigate();

  // Navigate to product page instead of showing modal
  React.useEffect(() => {
    if (isOpen && product) {
      navigate(`/product/${product.id}`);
      onClose(); // Close the modal since we're navigating away
    }
  }, [isOpen, product, navigate, onClose]);

  // This component no longer renders anything since it just handles navigation
  return null;
}

