import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

// Define a type for the onChange prop
interface FileUploadProps {
  onChange?: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
      setSelectedFileIndex(index);
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleRemove = useCallback((idxToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== idxToRemove));
    handleClose();
  }, [handleClose]);

  const MakeThumbnail = useCallback((idxToMove: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      const [fileToMove] = newFiles.splice(idxToMove, 1); // Remove the item from its current position
      newFiles.unshift(fileToMove); // Move it to the beginning of the array
      return newFiles;
    });
    handleClose();
  }, [handleClose]);

  const handleFileChange = useCallback((newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    if (onChange) {
      onChange(newFiles);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    multiple: true, // Set to true if you want to allow multiple files
  });

  // Memoize the JSX that maps over the files array
  const fileThumbnails = useMemo(() => {
    return files.map((file, index) => (
      <div className="relative w-full" key={index}>
        <div className='relative w-full h-40 flex overflow-hidden m-0 justify-center items-center rounded-lg bg-zinc-300 dark:bg-zinc-800'>
          {index === 0 && <p className='absolute font-bold bg-zinc-900 w-full text-center top-0 stroke-black stroke-2'>Thumbnail</p>}
          <img src={URL.createObjectURL(file)} className='w-full' alt={file.name} />
        </div>

        <div className="absolute top-0 right-0 stroke-black stroke-1">
          <IconButton
            id="basic-button"
            sx={{ color: 'inherit' }}
            aria-controls={open ? `menu+${index}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(event) => handleClick(event, index)}
          >
            <MoreHorizIcon />
          </IconButton>
        </div>
      </div>
    ));
  }, [files, handleClick, open]);

  return (
    <div className="w-full">
      <div
        {...getRootProps({
          className: 'dropzone p-10 border border-dashed border-gray-400 rounded-lg cursor-pointer',
        })}
      >
        <input {...getInputProps()} type="file" capture="environment" accept="image/*" />
        {isDragActive ? (
          <p className="text-gray-600">Drop Images here...</p>
        ) : (
          <p className="text-gray-600">🖼 Drag & drop some Images here, or click to select Images</p>
        )}
      </div>

      <div className="mt-4">
        {files.length > 0 && (
          <div className="!text-zinc-400 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {fileThumbnails}
            <Menu
              id="menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                className: 'bg-zinc-800 text-white',
              }}
            >
              <MenuItem className="!flex !justify-start hover:!bg-zinc-700" onClick={() => MakeThumbnail(selectedFileIndex)}>
                <ImageIcon color="info" /> <p className="ps-2">Make Thumbnail</p>
              </MenuItem>
              <Divider sx={{ borderBottomWidth: 1, opacity: '0.2', bgcolor: 'white' }} />
              <MenuItem className="!flex !justify-start hover:!bg-zinc-700" onClick={() => handleRemove(selectedFileIndex)}>
                <DeleteIcon color="error" /> <p className="ps-2">Remove</p>
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
