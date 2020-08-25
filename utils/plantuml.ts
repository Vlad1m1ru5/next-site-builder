import { PlantUmlPipe } from 'plantuml-pipe'
import { setImage, findImage } from 'utils/filesystem'

const getImage = async (src: string): Promise<string> => {
  const chunk = src
    .replace(/^```plantuml(\n)/, '')
    .replace(/`{3}(\n|$)/, '')

  if (!chunk) {
    return ''
  }
  
  const image = await findImage()
  
  const plantuml = new PlantUmlPipe()
  plantuml.out.on('data', setImage(image))
  plantuml.in.write(chunk)
  plantuml.in.end()
  
  return `![Diagram](/images/diagrams/${image}.svg)`
}

const getImages = async (diagrams: string[]): Promise<string[]> => {
  const images: string[] = []

  for (const diagram of diagrams) {
    images.push(await getImage(diagram))
  }

  return images
}

export const getPlantUmlFor = async (content: string): Promise<string> => {
  const plantumls = content.match(/```plantuml(\n)(.|\n)*`{3}(\n)/g)
  const images = plantumls ? (await getImages(plantumls)).join('\n') : ''
  
  return content
    .concat(images)
    .replace(/```plantuml(\n)(.|\n)*`{3}(\n)/g, '')
}
