import { promises as fs, Dirent } from 'fs'

const findAllDirentsFor = async (path: string): Promise<Dirent[]> => {
  return fs.readdir(path, { withFileTypes: true })
}

const findAllDirectoriesFor = async (path: string): Promise<Dirent[]> => {
  const entries = await findAllDirentsFor(path)
  
  return entries
    .filter((entry) => entry.isDirectory())
}

const getDirentName = (dirent: Dirent): string => dirent.name

export const findAllDirectoriesPathsFor = async (root: string): Promise<string[]> => {
  const paths: string[] = []
  const directories = (await findAllDirectoriesFor(root))
    .map(getDirentName)

  for (const directory of directories) {
    const path = `${root}/${directory}`
    paths.push(path, ...await findAllDirectoriesPathsFor(path))
  }

  return paths
}

const findAllFilesFor = async (path: string): Promise<Dirent[]> => {
  const entries = await findAllDirentsFor(path)

  return entries
    .filter((entry) => entry.isFile())
}

const findIndexIn = (files: Dirent[]): Dirent | undefined => {
  return files.find((file) => file.name === 'index.md')
}

export const findAllMarkdownsFor = async (path: string): Promise<string> => {
  const files = await findAllFilesFor(path)
  const index = findIndexIn(files)
  
  if (index !== undefined) {
    const indexFile = `${path}/${getDirentName(index)}`
    
    const file = await fs.readFile(indexFile, 'utf-8')
    return file
  }

  return ''
}
