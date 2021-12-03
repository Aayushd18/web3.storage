import React, { createElement, useCallback } from 'react'
import useState from 'storybook-addon-state';
import Button from 'ZeroComponents/button/button';
import Dropzone from './dropzone';
import { ReactComponent as OpenIcon } from 'Icons/open.svg'

export default {
  title: 'Zero/Dropzone'
};

export const Default = () => (
  <Dropzone
    icon={<OpenIcon />}
    dragAreaText="Drag and drop your files here"
  />
);

export const FileReader = () => createElement(() => {
  const [files, setFiles] = useState(null);

  const onFileChangeSuccess = useCallback((acceptedFiles) => setFiles(acceptedFiles), []);
  const onFileChangeError = useCallback((rejectedFiles) => console.error(rejectedFiles), []);

  const onUpload = useCallback(() => {
    if(files)
      files.forEach((file) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => console.log(reader.result)
        reader.readAsArrayBuffer(file)
      })
  }, []);

  return (
    <form>
      <Dropzone
        icon={<OpenIcon />}
        dragAreaText="Drag and drop your files here"
        maxFiles={2}
        accept={'image/jpeg, image/png'}
        multiple={true}
        onChange={onFileChangeSuccess}
        onError={onFileChangeError}
      />
      <small>NOTE: Due to storybook limitations the file list only shows in `Default`</small>
      <Button type="button" onClick={onUpload}>Upload</Button>
    </form> 
  )
});

export const FormData = () => createElement(() => {
  const [files, setFiles] = useState(null);

  const onFileChangeSuccess = useCallback((acceptedFiles) => setFiles(acceptedFiles), []);
  const onFileChangeError = useCallback((rejectedFiles) => console.error(rejectedFiles), []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    if(files)
      files.forEach((file) => {
        formData.append('files', file, file.name)
      })
  }, []);

  return (
    <form enctype="multipart/form-data" onSubmit={onSubmit}>
      <input type="text" name="test" />
      <Dropzone
        icon={<OpenIcon />}
        dragAreaText="Drag and drop your files here"
        maxFiles={2}
        accept={'image/jpeg, image/png'}
        multiple={true}
        onChange={onFileChangeSuccess}
        onError={onFileChangeError}
      />
      <small>NOTE: Due to storybook limitations the file list only shows in `Default`</small>
      <Button type="submit">Upload</Button>
    </form> 
  )
});