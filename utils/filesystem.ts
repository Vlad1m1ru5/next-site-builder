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
