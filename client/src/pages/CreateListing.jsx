import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (files) => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      setUploading(true);
      setImageUploadError(null);
      const storage = getStorage(app);
      const uploadPromises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
            }
          );
        });
      });

      Promise.all(uploadPromises)
        .then((urls) => {
          setFormData((prevData) => ({
            ...prevData,
            imageUrls: [...prevData.imageUrls, ...urls],
          }));
          setUploading(false);
          setProgress(0);
        })
        .catch(() => {
          setImageUploadError('Failed to upload images. Max size: 2 MB per image.');
          setUploading(false);
          setProgress(0);
        });
    } else {
      setImageUploadError('You can upload a maximum of 6 images.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) return setImageUploadError('Upload at least one image.');
    if (+formData.regularPrice < +formData.discountPrice) {
      return setImageUploadError('Discount price must be less than regular price.');
    }
    setLoading(true);

    try {
      const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        navigate(`/listing/${data._id}`);
      } else {
        setImageUploadError(data.message);
      }
    } catch (err) {
      setImageUploadError('Failed to create listing.');
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Create a New Listing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Property Name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-green-300"
        />
        
        {/* Description Input */}
        <textarea
          placeholder="Description"
          id="description"
          required
          value={formData.description}
          onChange={handleChange}
          className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-green-300"
          rows={4}
        />

        {/* Address Input */}
        <input
          type="text"
          placeholder="Property Address"
          id="address"
          required
          value={formData.address}
          onChange={handleChange}
          className="border p-3 w-full rounded-lg shadow-sm focus:ring focus:ring-green-300"
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <label htmlFor="imageUpload" className="font-semibold">Upload Images (Max 6)</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
            className="border p-3 w-full rounded-lg shadow-sm"
          />
          {uploading && <p className="text-green-600">Uploading... {progress.toFixed(0)}%</p>}
          {imageUploadError && <p className="text-red-600">{imageUploadError}</p>}
          
          <div className="flex gap-4 mt-4">
            {formData.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Uploaded ${index}`} className="w-24 h-24 object-cover rounded-lg" />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Creating Listing...' : 'Create Listing'}
        </button>
      </form>
    </main>
  );
}
