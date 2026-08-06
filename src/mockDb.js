// src/mockDb.js
// Note: We are keeping the file name as mockDb.js to avoid breaking imports, 
// but it is now fully integrated with Supabase.

import { supabase } from './supabaseClient';

// Auth methods
export const loginAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

export const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error logging out:', error.message);
  }
};

export const checkAuth = () => {
  // We can check if a session exists synchronously via local storage,
  // but supabase-js handles the session persistence.
  // A simple synchronous check to see if we have a token stored by Supabase:
  const session = localStorage.getItem('sb-viylmqyewejnijrsjjqd-auth-token');
  return !!session;
};

// Product methods
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error.message);
    throw new Error(error.message);
  }

  return data;
};

export const addProduct = async (product) => {
  // We don't need to pass the ID, Supabase generates it (UUID).
  const { id, ...productData } = product;
  
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error('Error adding product:', error.message);
    throw new Error(error.message);
  }

  return data;
};

export const updateProduct = async (id, updatedData) => {
  const { data, error } = await supabase
    .from('products')
    .update(updatedData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error.message);
    throw new Error(error.message);
  }

  return data;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error.message);
    throw new Error(error.message);
  }
};
