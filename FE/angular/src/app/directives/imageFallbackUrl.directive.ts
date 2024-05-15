import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[imageFallbackUrl]'
})
export class ImageFallbackUrlDirective {
  @Input('imageFallbackUrl') fallbackUrl = '';

  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  displayFallbackImg() {
    this.elementRef.nativeElement.src = '/assets/images/404_image.webp';
  }
}
