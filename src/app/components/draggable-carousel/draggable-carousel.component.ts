import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { gsap, TweenMax } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-draggable-carousel',
  standalone: true,
  templateUrl: './draggable-carousel.component.html',
  styleUrls: ['./draggable-carousel.component.css'],
})
export class DraggableCarouselComponent implements OnInit, AfterViewInit {
  private slides!: NodeListOf<Element>;
  private container!: HTMLElement;
  private slider!: HTMLElement;
  private scrubber!: HTMLElement;
  private handle!: HTMLElement;

  private slideCount!: number;
  private boxWidth!: number;
  private sliderWidth!: number;
  private targetX: number = 0;
  private lastTarget: number = 0;
  private ratio!: number;
  private ratioX!: number;

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    gsap.registerPlugin(Draggable);
  }

  ngAfterViewInit() {
    this.slides = this._document.querySelectorAll('.sliderItem'); // Mantengo NodeListOf<Element>
    this.container = this._document.querySelector('#container')!;
    this.slider = this._document.querySelector('#slider')!;
    this.scrubber = this._document.querySelector('#scrubber')!;
    this.handle = this._document.querySelector('#handle')!;

    this.slideCount =
      this._document.getElementsByClassName('sliderItem').length;

    this.boxWidth = this.container.offsetWidth;
    this.sliderWidth = this.boxWidth * this.slideCount;

    console.log('slides');
    console.log(this.slider);

    // Usando forEach después de la conversión
    for (var i = 0; i < this.slides.length; i++) {
      (this.slides[i] as HTMLElement).style.width = this.boxWidth + 'px';
    }

    this.slider.style.width = this.sliderWidth + 'px';

    Draggable.create(this.slider, {
      type: 'x',
      edgeResistance: 0.6,
      bounds: '#container',
      throwProps: true,
      onDrag: this.setProgress,
      onThrowUpdate: this.setProgress,
    });

    this.initScrollBar();
  }

  private initializeElements(): void {
    this.slides = this._document.querySelectorAll('.sliderItem');
    this.container = this._document.querySelector('#container') as HTMLElement;
    this.slider = this._document.querySelector('#slider') as HTMLElement;
    this.scrubber = this._document.querySelector('#scrubber') as HTMLElement;
    this.handle = this._document.querySelector('#handle') as HTMLElement;
    this.slideCount = this.slides.length;
  }

  private setupSlides(): void {
    this.boxWidth = this.container.offsetWidth;
    this.sliderWidth = this.boxWidth * this.slideCount;

    this.slides.forEach((slide) => {
      (slide as HTMLElement).style.width = `${this.boxWidth}px`;
    });

    this.slider.style.width = `${this.sliderWidth}px`;
  }

  private setupSlider(): void {
    Draggable.create(this.slider, {
      type: 'x',
      edgeResistance: 0.6,
      bounds: '#container',
      throwProps: true,
      onDrag: () => this.setProgress(),
      onThrowUpdate: () => this.setProgress(),
    });
  }

  private setProgress(): void {
    const x = Number(gsap.getProperty('#slider', 'x'));
    this.targetX = Math.round(x / this.boxWidth);
    this.targetX = Math.max(Math.min(this.targetX, 0), -this.slideCount + 1);

    gsap.set(this.scrubber, { x: -this.ratioX * this.ratio });
    this.lastTarget = this.targetX;
  }

  prevElement(): void {
    if (this.targetX < 0) {
      this.targetX++;
      this.moveSlider();
    }
  }

  nextElement(): void {
    if (this.targetX > -this.slideCount + 1) {
      this.targetX--;
      this.moveSlider();
    }
  }

  private moveSlider(): void {
    TweenMax.to(this.slider, 1, {
      x: this.boxWidth * this.targetX,
      onUpdate: () => this.setProgress(),
    });
  }

  private initScrollBar(): void {
    const scrubWidth = this.scrubber.getBoundingClientRect().width;
    const handleWidth = scrubWidth / this.slideCount;
    this.ratio = scrubWidth / this.sliderWidth;

    gsap.set(this.handle, { width: handleWidth });

    Draggable.create(this.handle, {
      type: 'x',
      throwProps: true,
      snap: {
        x: (value) => this.snapHandle(value, handleWidth),
      },
      onDrag: () => this.updateSlides(),
      onThrowUpdate: () => this.updateSlides(),
    });
  }

  private snapHandle(value: number, handleWidth: number): number {
    this.ratioX = Math.round(value / handleWidth) * handleWidth;
    return this.ratioX;
  }

  private updateSlides(): void {
    gsap.set(this.slider, { x: -this.ratioX / this.ratio });
  }
}
