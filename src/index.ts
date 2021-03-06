// typings.d.ts
import A11yDialog from 'a11y-dialog'
import {
  getIndex,
  getLightboxImage,
  mapElementsToImageLike,
  removeAnimationClass,
  toggleBodyOverflow,
  updateImage
} from './helpers'

import './scss/main.scss'

export interface ILightboxConfig {
  GalleryImages: HTMLImageElement[]
  Lightbox: Element
  animationClass: string
}

const VanillaBox = ({ GalleryImages, Lightbox, animationClass }: ILightboxConfig) => {
  if (!GalleryImages) {
    return
  }
  let currentIndex = 0
  const LightboxDialog = new A11yDialog(Lightbox)
  const Images = mapElementsToImageLike([...GalleryImages])
  const ImagesLength = Images.length
  const LightboxImage = getLightboxImage(Lightbox)
  const PrevButton = Lightbox.querySelector('[data-action="prev"]')
  const NextButton = Lightbox.querySelector('[data-action="next"]')
  const changeImage = updateImage(Images, LightboxImage, animationClass)

  // AddEventListener
  LightboxDialog.on('show', toggleBodyOverflow)
  LightboxDialog.on('hide', toggleBodyOverflow)
  LightboxImage.addEventListener('animationend', ({ target }) =>
    removeAnimationClass(animationClass, target as Element)
  )
  if (PrevButton && NextButton) {
    PrevButton.addEventListener('click', () =>
      changeImage((currentIndex = getIndex(ImagesLength, currentIndex, 'PREV')))
    )
    NextButton.addEventListener('click', () =>
      changeImage((currentIndex = getIndex(ImagesLength, currentIndex, 'NEXT')))
    )
  }
  GalleryImages.forEach((image, index) =>
    image.addEventListener('click', () => {
      changeImage(index).then(() => !LightboxDialog.shown && LightboxDialog.show())
    })
  )
}

export default VanillaBox
