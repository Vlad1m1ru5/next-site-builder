import { promises as fs, Dirent } from 'fs'
import { log } from 'console'

export const findAllDirentsFor = async (path: string): Promise<Dirent[]> => {
  return fs.readdir(path, { withFileTypes: true })
}

export const findAllDirectoriesFor = async (path: string): Promise<string[]> => {
  const entries = await findAllDirentsFor(path)
  
  return entries
    .filter((entry) => entry.isDirectory())
    .map((directory) => directory.name)
}

export const findAllDirectoriesPathsFor = async (root: string): Promise<string[]> => {
  const paths: string[] = []
  const directories = (await findAllDirectoriesFor(root))

  for (const directory of directories) {
    const path = `${root}/${directory}`
    paths.push(path, ...await findAllDirectoriesPathsFor(path))
  }

  return paths
}
