
//menu
var el = document.querySelector('.menu-icon');
            el.addEventListener('click',()=>{
                let menu = document.querySelector('.items-mobile');
                if(menu.style.height == "400px"){
                    menu.style.height = "0";
                    let btnClose = document.querySelector('.btn-close');
                    el.style.display = "block";
                    btnClose.style.display = "none";
                }else{
                    menu.style.height = "400px";
                    let btnClose = document.querySelector('.btn-close');
                    el.style.display = "none";
                    btnClose.style.display = "block";
                }
            });


//carrosel

const galleryContainer = document.querySelector('.gallery');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];

    // Adicionar eventos de toque e arrastar
    this.carouselContainer.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.carouselContainer.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.carouselContainer.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.carouselContainer.addEventListener('dragend', this.handleDragEnd.bind(this));
  }

  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  setCurrentState(direction) {
    if (direction.className === 'gallery-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }

  // Variáveis para gestos de toque e arrastar
  touchStartX = 0;
  touchEndX = 0;

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;
  }

  handleTouchMove(event) {
    this.touchEndX = event.touches[0].clientX;
  }

  handleDragStart(event) {
    this.touchStartX = event.clientX;
  }

  handleDragEnd(event) {
    this.touchEndX = event.clientX;
    this.handleGesture();
  }

  handleGesture() {
    const gestureDelta = this.touchEndX - this.touchStartX;

    if (gestureDelta > 0) {
      // Movimento para a direita (anterior)
      this.setCurrentState(document.querySelector('.gallery-controls-previous'));
    } else if (gestureDelta < 0) {
      // Movimento para a esquerda (próximo)
      this.setCurrentState(document.querySelector('.gallery-controls-next'));
    }
  }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();


