/**
 * Created by AKuzmanoski on 06/12/2016.
 */
import {
  Component,
  ChangeDetectorRef,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  HostBinding,
  HostListener,
  group,
  keyframes
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
      state("active", style({
        opacity: 1
      })),
      state("loading", style({
        opacity: 0
      })),
      transition("* => active", [
        style({
          opacity: 0,
          filter: "saturate(20%) brightness(125%)"
        }),
        group([
          animate("1s cubic-bezier(0.7,0,0.6,1)", style({
            opacity: 1
          })),
          animate("2s cubic-bezier(0.7,0,0.6,1)", keyframes([
            style({filter: "saturate(20%) brightness(125%)", offset: 0}),
            style({filter: "saturate(84.8%) brightness(100%)", offset: 0.75}),
            style({filter: "saturate(100%) brightness(100%)", offset: 1})
          ]))
        ])
      ]),
      transition("* => loading", [
        style({
          opacity: 1,
          filter: "saturate(100%) brightness(100%)"
        }),
        group([
          animate("250ms 250ms cubic-bezier(0.7,0,0.6,1)", style({
            opacity: 0
          })),
          animate("500ms cubic-bezier(0.7,0,0.6,1)", keyframes([
            style({filter: "saturate(100%) brightness(100%)", offset: 0}),
            style({filter: "saturate(35.2%) brightness(125%)", offset: 0.75}),
            style({filter: "saturate(20%) brightness(125%)", offset: 1})
          ]))
        ])
      ]),
      transition("loading => *", [
        style({
          opacity: 0,
          filter: "saturate(20%) brightness(125%)"
        }),
        group([
          animate("1s cubic-bezier(0.7,0,0.6,1)", style({
            opacity: 1
          })),
          animate("2s cubic-bezier(0.7,0,0.6,1)", keyframes([
            style({filter: "saturate(20%) brightness(125%)", offset: 0}),
            style({filter: "saturate(84.8%) brightness(100%)", offset: 0.75}),
            style({filter: "saturate(100%) brightness(100%)", offset: 1})
          ]))
        ])
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
    this._nextImage = image
    if (this.activeImage != null) {
      this.status = 'loading';
    }
    else {
      //this.loadingStageReady();
    }
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
    this.downloadImage(this.nextImage, () => {
      this.activeImage = this.nextImage;
      this._nextImage = null;
      this.status = "active";
      this.ref.detectChanges();
    })
  }

  downloadImage(url: string, fn: Function) {
    var img = new Image();
    img.onload = () => {
      if (this.status == "loading")
        setTimeout(fn, 500);
      else fn();
    }
    img.src = url;
  }
}
