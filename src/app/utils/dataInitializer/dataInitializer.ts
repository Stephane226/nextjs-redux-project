'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getProducts } from "../../redux/slices/productSlice";

export default function DataInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return null;
}
