/**
 * Created by AKuzmanoski on 06/12/2016.
 */
import {
  Component, ChangeDetectorRef, Input, trigger, state, style, transition, animate,
  HostBinding, HostListener
} from "@angular/core";
@Component({
  moduleId: module.id,
  selector: "ideal-smoot-image-widget",
  template: `
    <img [attr.src]="activeImage"/>
   `,
  animations: [
    trigger('loading', [
      state("*", style({
        opacity: 1
      })),
      state("loading", style({
        opacity: 0.2
      })),
      transition("* => loading", [
        style({
          opacity: 1,
        }),
        animate("150ms ease", style({
          opacity: 0.2
        }))
      ]),
      transition("loading => *", [
        style({
          opacity: 0.2,
        }),
        animate("200ms ease", style({
          opacity: 1
        }))
      ])
    ])
  ],
  styleUrls: ["smooth-image.widget.css"]
})
export class SmoothImageWidget {
  private _nextImage: string;
  private _activeImage: string;
  public status: string;
  @Input("width") width: number;
  @Input("height") height: number;
  @Input("isCircle") isCircle: boolean = false;

  @HostBinding("@loading")
  get loading() {
    return this.status;
  }


  @HostListener("@loading.done")
  loadingDone() {
    return this.loadingStageReady();
  }

  @HostBinding("style.overflow")
  get overflow() {
    return "hidden";
  }

  @HostBinding("style.height")
  get h() {
    if (this.height != null)
      return this.height + "px";
    return "inherit";
  }

  @HostBinding("style.width")
  get w() {
    if (this.width != null)
      return this.width + "px";
    return "inherit";
  }

  constructor(public ref: ChangeDetectorRef) {

  }

  @Input("idealSrc") set nextImage(image: string) {
    this.status = 'loading';
    this._nextImage = image;
  }

  get activeImage() {
    return this._activeImage;
  }

  get nextImage() {
    return this._nextImage;
  }

  set activeImage(image: string) {
    this._activeImage = image;
  }

  loadingStageReady() {
    console.log("HERE");
    downloadImage(this.nextImage, () => {
      this.activeImage = this.nextImage;
      this._nextImage = null;
      this.status = null;
      this.ref.detectChanges();
    })
  }
}

function downloadImage(url: string, fn: Function) {
  var img = new Image();
  img.onload = () => {
    setTimeout(fn, 150);

  }
  img.src = url;
}
