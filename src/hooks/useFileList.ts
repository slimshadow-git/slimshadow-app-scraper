import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, FileData, isErrorResponse } from '../types/api';
import { useDebounce } from './useDebounce';

interface UseFileListResult {
  files: FileData[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  perPage: number;
  setPerPage: (perPage: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function useFileList(): UseFileListResult {
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
      });
      
      if (debouncedSearch) {
        searchParams.set('search', debouncedSearch);
      }
      
      const response = await fetch(
        `https://r3hab-final-step.hf.space/files?${searchParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data: ApiResponse = await response.json();
      
      if (isErrorResponse(data)) {
        setError(data.error);
        setTotalPages(data.total_pages);
        setFiles([]);
      } else {
        setFiles(data.data);
        setTotalPages(data.total_pages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage, debouncedSearch]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return {
    files,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    searchQuery,
    setSearchQuery
  };
}