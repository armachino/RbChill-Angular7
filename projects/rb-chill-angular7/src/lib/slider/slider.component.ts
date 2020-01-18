import { Component, OnInit, ElementRef, Renderer2, ViewChild, Input, AfterContentInit, AfterViewInit } from "@angular/core";

class ElementContent {
  width: number = 0
  marginRight: number = 0
  marginLeft: number = 0
  totalWidth: number = 0
}

@Component({
  selector: "chill-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"]
})
export class SliderComponent implements OnInit, AfterContentInit, AfterViewInit {
  SliderStatus: string = "End";
  sliderType: string = '';
  StartClientX: number = 0;
  DeltaX: number = 0;
  StoreWidth: number = 0;
  SlideCount: number = 0;
  currentSlide: number = 0;
  slidesDivWidth: number = 0;

  // outerHtmlArray: Array<any> = [];
  displayContent: string = '';
  buttonStatus: string = ''
  defaultButton: boolean = false;
  fullButtonCounter: number = 0

  backgroundImage: string = ''
  backgroundColor: string = ''

  elementsContentArray: Array<ElementContent> = []

  totalSlidesWidth: number = 0;

  elIndex: number = 0
  time: number = 0
  timerStatus: string = ''

  doesTimerNeedReconfig = false;
  intervalRef = null

  sliderSize: any
  // responsive : boolean = false
  constructor() { }

  ngOnInit() {
    console.log("------ HELLO FROM RbChill Slider :) ------ ")

  }


  

  ngAfterContentInit() {
    this.slides.nativeElement.addEventListener(
      "mousedown",
      this.mouseEnter.bind(this)
    );
    this.slides.nativeElement.addEventListener(
      "mousemove",
      this.mouseMove.bind(this)
    );
    this.slides.nativeElement.addEventListener(
      "mouseup",
      this.mouseUp.bind(this)
    );
    this.slides.nativeElement.addEventListener(
      "mouseleave",
      this.mouseLeave.bind(this)
    );
    // //////////
    this.slides.nativeElement.addEventListener(
      "touchstart",
      this.touchstart.bind(this)
    );
    this.slides.nativeElement.addEventListener(
      "touchmove",
      this.touchmove.bind(this)
    );
    // touchend function is similar to mouseup
    this.slides.nativeElement.addEventListener(
      "touchend",
      this.mouseUp.bind(this)
    );

    this.addSlidesContent()

    // if (this.responsive) {
    //   console.log('ngDocheckngDocheckngDocheck')
    //   let sliderSizeTemp = this.slider.nativeElement.offsetWidth
    //   let width = 0
    //   for (let item of this.elementsContentArray) {
    //     width += item.totalWidth
    //     if (sliderSizeTemp < width) {
    //       this.sliderSize = width - item.totalWidth
    //       console.log('sliderSize',this.sliderSize)
    //       break
    //     }
    //   }
    // }


  }


  ngAfterViewInit(): void {
    if (!this.defaultButton) {
      this.buttonManagement()
    }

    this.timerManagement()
  }


  //-------/////////////////////////////////////////////////////////
  // slider Types
  @Input("backgroundElementSlider") set backgroundElementsSliderSetter(backgroundElementSlider) {
    this.displayContent = "-webkit-inline-box"
    this.sliderType = "backgroundElementSlider"
  }
  @Input("backgroundSlider") set backgroundSliderSetter(backgroundSlider) {
    this.displayContent = "inline-block";
    this.sliderType = "backgroundSlider";
  }
  @Input("elementSlider") set perElementSliderSetter(elementSlider) {
    this.sliderType = 'elementSlider'
    this.displayContent = "-webkit-inline-box";
  }

  @Input("freeSlider") set customSliderSetter(freeSlider) {
    this.displayContent = "-webkit-inline-box";
    this.sliderType = "freeSlider";
  }
  @Input('loopSlider') set loopSliderSetter(loopSlider) {
    this.sliderType = 'loopSlider'
  }

  //-------/////////////////////////////////////////////////////////
  // button Types
  @Input("nextBtn") nextBtn
  @Input("previousBtn") previousBtn
  @Input("defaultBtn") set sliderButtonSetter(sliderButton) {
    this.defaultButton = true;
  }
  //// button functionality type

  @Input("elementButton") set elementButoonSetter(elementButton) {
    this.buttonStatus = 'elementButton'
  }
  @Input('backgroundButton') set backgroundButtonSetter(backgroundButton) {
    this.buttonStatus = 'backgroundButton'
  }

  //-------/////////////////////////////////////////////////////////

  @Input('elementTimeout') set elementTimeoutSetter(elementTimeout) {
    this.timerStatus = 'elementTimeout'
    this.time = elementTimeout
    // console.log('elementTimeout-------', elementTimeout)
  }

  @Input('backgroundTimeout') set backgroundTimeoutSetter(backgroundTimeout) {
    this.timerStatus = 'backgroundTimeout'
    this.time = backgroundTimeout
    // console.log('backgroundTimeout-------', backgroundTimeout)
  }

  //-------/////////////////////////////////////////////////////////
  @Input('backgroundColor') set backgroundColorSetter(backgroundColor) {
    this.backgroundColor = backgroundColor
  }

  @Input('backgroundImage') set backgroundImageSetter(backgroundImage) {
    this.backgroundImage = backgroundImage
  }
  //-------/////////////////////////////////////////////////////////
  // @Input("responsive") set responsiveSetter(responsive) {
  //   this.responsive =true
  //   console.log('responsive')
  // }

  @ViewChild("slides") slides: ElementRef
  @ViewChild("slider") slider: ElementRef

  // onResize(event) {

  // }

  touchstart(event: TouchEvent) {
    // console.log('touchstart')
    if (this.SliderStatus == "End") {
      this.SliderStatus = "Start";
      this.StartClientX = event.touches[0].clientX;
      // console.log(this.StartClientX)
    }
    // 
  }
  touchmove(event: TouchEvent) {
    this.DeltaX = this.StartClientX - event.touches[0].clientX;
    // console.log('this.DeltaX',this.DeltaX)
    if (this.SliderStatus == "Start" && (this.StartClientX - event.touches[0].clientX) != 0) {
      this.SliderStatus = "Changing";
      // console.log(this.SliderStatus)
      this.slides.nativeElement.addEventListener('click', (event) => {
        event.preventDefault()
      }, { once: true })
      // console.log(this.slides);
    }


  }

  mouseEnter(event: MouseEvent) {
    // console.log("slider Start");

    if (this.SliderStatus == "End") {
      this.SliderStatus = "Start";
      this.StartClientX = event.clientX;
    }
    // console.log("widthh", this.slidesDivWidth);
  }

  mouseMove(event: MouseEvent) {
    // this.DeltaX = this.StartClientX - event.clientX;
    this.DeltaX = this.StartClientX - event.clientX;
    if (this.SliderStatus == "Start" && (this.StartClientX - event.clientX) != 0) {
      this.SliderStatus = "Changing";
      // console.log(this.SliderStatus)
      this.slides.nativeElement.addEventListener('click', (event) => {
        event.preventDefault()
      }, { once: true })
      // console.log(this.slides);
    }

    // decrease DletaX for less overflowing slider
    // this.condition=(this.StoreWidth + this.DeltaX > this.totalSlidesWidth - this.slidesDivWidth || this.StoreWidth + this.DeltaX < 0 )

    // if (this.StoreWidth + this.StartClientX - event.clientX > this.totalSlidesWidth - this.slidesDivWidth || this.StoreWidth + this.StartClientX - event.clientX < 0 ){
    //   this.DeltaX = (this.StartClientX - event.clientX)/3
    // }else{
    //   this.DeltaX = this.StartClientX - event.clientX;
    // }

  }

  mouseUp(event: MouseEvent) {
    if (this.SliderStatus == "Start") {
      this.SliderStatus = "End";
    } else if (this.SliderStatus == "Changing") {
      // console.log("slider End");
      this.sliderManagement()

    }
  }

  mouseLeave(event) {
    if (this.SliderStatus == "Changing") {
      this.sliderManagement();
    }
  }

  addSlidesContent() {
    this.SlideCount = this.slides.nativeElement.children.length;
    // this.slidesDivWidth = this.slides.nativeElement.clientWidth;
    this.slidesDivWidth = parseFloat(window.getComputedStyle(this.slides.nativeElement).getPropertyValue("width"))

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // console.log(this.slides)
    // console.log(this.slides.nativeElement.clientWidth)
    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    // this.slidesElementsWidth = this.slides.nativeElement.children[0].clientWidth;
    // let childNodesObj = this.slides.nativeElement.childNodes
    let slidesChildren = this.slides.nativeElement.children
    let childMarginLeft: number
    let childMarginRight: number
    let childWidth: number
    let elementContentObj: ElementContent

    for (let child of slidesChildren) {
      childMarginLeft = parseInt(window.getComputedStyle(child).getPropertyValue("margin-left"))
      childMarginRight = parseInt(window.getComputedStyle(child).getPropertyValue("margin-right"))
      childWidth = parseInt(window.getComputedStyle(child).getPropertyValue("width"))
      elementContentObj = { width: childWidth, marginLeft: childMarginLeft, marginRight: childMarginRight, totalWidth: childMarginLeft + childMarginRight + childWidth }
      this.elementsContentArray.push(elementContentObj)

      this.totalSlidesWidth += childMarginLeft + childMarginRight + childWidth
    }
    // console.log('arayyy---', this.elementsContentArray)


    // for (let x of childNodesObj) {
    //   this.outerHtmlArray.push(x["outerHTML"]);
    // }
  }
  //------------------///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  timerManagement() {
    // console.log('timerStatuss------', this.timerStatus)

    if (this.timerStatus == 'elementTimeout') {
      this.perElementTimer()
    } else if (this.timerStatus == 'backgroundTimeout') {
      this.backgroundTimer()
    }
  }


  perElementTimer() {
    // console.log('wtfffff')

    if (this.intervalRef !== null) {
      clearInterval(this.intervalRef)
    }
    this.intervalRef = setInterval(() => {
      if (this.SliderStatus == 'Changing') {
        // console.log('nemishe beram', this.intervalRef)
        // console.log('ino man badan baiad ok konam')
        this.doesTimerNeedReconfig = true
        if (this.intervalRef !== null) {
          clearInterval(this.intervalRef)
        }
      } else {
        // console.log('raftim ===>')
        this.perElementButton(1)
      }
    }, this.time)
  }

  backgroundTimer() {
    if (this.intervalRef !== null) {
      clearInterval(this.intervalRef)
    }
    this.intervalRef = setInterval(() => {
      if (this.SliderStatus == 'Changing') {
        // console.log('nemishe beram', this.intervalRef)
        // console.log('ino man badan baiad ok konam')
        this.doesTimerNeedReconfig = true
        if (this.intervalRef !== null) {
          clearInterval(this.intervalRef)
        }
      } else {
        // console.log('raftim ===>')
        this.FullWidthButton(1)
      }
    }, this.time)
  }

  //------------------///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  buttonManagement(x?) {
    // console.log('buttonManagement---')
    if (this.buttonStatus == 'elementButton') {
      if (this.defaultButton) {
        this.perElementButton(x)
      } else {
        this.nextBtn.addEventListener('click', () => { this.perElementButton(1) })
        this.previousBtn.addEventListener('click', () => { this.perElementButton(-1) })
      }

    } else if (this.buttonStatus == 'backgroundButton') {
      if (this.defaultButton) {
        this.FullWidthButton(x)
      } else {
        this.nextBtn.addEventListener('click', () => { this.FullWidthButton(1) })
        this.previousBtn.addEventListener('click', () => { this.FullWidthButton(-1) })
      }
    }
  }

  FullWidthButton(x) {
    if ((this.currentSlide + x) * this.slidesDivWidth > this.totalSlidesWidth - this.slidesDivWidth) {
      // this.StoreWidth = (this.totalSlidesWidth) - this.slidesDivWidth;
      this.StoreWidth = 0
      this.currentSlide -= this.fullButtonCounter
      this.fullButtonCounter = 0
    } else if ((this.currentSlide + x) * this.slidesDivWidth < 0) {
      this.StoreWidth = 0
    } else {
      this.fullButtonCounter += x
      this.currentSlide = this.currentSlide + x;
      this.StoreWidth = this.currentSlide * this.slidesDivWidth;
    }
    this.SliderStatus = "End";


  }

  perElementButton(x) {

    if (this.StoreWidth + x * (this.elementsContentArray[0].totalWidth) > (this.totalSlidesWidth) - this.slidesDivWidth) {
      // this.StoreWidth = (this.totalSlidesWidth) - this.slidesDivWidth

      this.StoreWidth = 0
      this.elIndex = 0

    } else if (this.StoreWidth + x * (this.elementsContentArray[0].totalWidth) < 0) {
      this.StoreWidth = 0

    } else {
      this.StoreWidth += (x == 1) ? this.elementsContentArray[0].totalWidth : -(this.elementsContentArray[0].totalWidth)
      this.elIndex += x
    }
    this.SliderStatus = "End"
    // console.log('storeWidth-', this.StoreWidth)
    //   if ( this.elIndex+ x >= 0 && this.elementsContentArray.length > this.elIndex + x-1 && this.elementsContentArray[this.elIndex +x].totalWidth ){
    //     this.elIndex +=x
    //     this.StoreWidth += (x==1 ) ? this.elementsContentArray[this.elIndex].totalWidth : -(this.elementsContentArray[this.elIndex].totalWidth)

    //   }
  }

  //-----------------///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  sliderManagement() {

    if (this.sliderType === 'backgroundSlider') {
      this.sliderChangeBackgound()
    } else if (this.sliderType === 'freeSlider') {
      this.sliderChangeFree()
    }else if (this.sliderType == 'elementSlider') {
      this.sliderChangePerElement()
    } else if (this.sliderType == 'backgroundElementSlider') {
      this.sliderChangeBackgroundElements()
    }
    // else if (this.sliderType === 'loopSlider') {
    //   this.sliderChangeBackgroundLoop()
    // } 
    if (this.doesTimerNeedReconfig) {
      this.timerManagement()
    }
  }

  sliderChangeBackgound() {
    // slider will change with full element width
    console.log('div', this.slidesDivWidth)

    this.currentSlide = this.DeltaX > 0 ? this.currentSlide + 1 : this.currentSlide - 1;
    this.currentSlide = Math.min(Math.max(this.currentSlide, 0), this.SlideCount - 1);
    this.StoreWidth = this.currentSlide * this.slidesDivWidth;
    this.DeltaX = 0;
    this.SliderStatus = "End";

  }

  sliderChangePerElement() {
    this.SliderStatus = "End"
    let width = 0
    if (this.StoreWidth + this.DeltaX > (this.totalSlidesWidth) - this.slidesDivWidth) {
      this.StoreWidth = this.totalSlidesWidth - this.slidesDivWidth
    } else if (this.StoreWidth + this.DeltaX < 0) {
      this.StoreWidth = 0
    } else {
      for (let item of this.elementsContentArray) {
        width += item.totalWidth
        if (this.StoreWidth + this.DeltaX <= width) {
          this.StoreWidth = (this.StoreWidth + this.DeltaX < width - (item.totalWidth / 2)) ? width - item.totalWidth : width;
          break
        }
      }
    }

  }

  sliderChangeFree() {
    // slider will change with custom size and free dragging
    this.SliderStatus = "End";
    if (this.StoreWidth + this.DeltaX > (this.totalSlidesWidth) - this.slidesDivWidth) {
      // if (this.StoreWidth + this.DeltaX > (this.SlideCount * this.slidesElementsWidth) - this.slidesDivWidth) {
      this.StoreWidth = (this.totalSlidesWidth) - this.slidesDivWidth
      // this.StoreWidth = (this.SlideCount * this.slidesElementsWidth) - this.slidesDivWidth
    } else if (this.StoreWidth + this.DeltaX < 0) {
      this.StoreWidth = 0
    } else {
      this.StoreWidth = this.StoreWidth + this.DeltaX;
    }

  }

  sliderChangeBackgroundElements() {
    this.SliderStatus = "End";
    if (this.StoreWidth + this.slidesDivWidth > this.totalSlidesWidth - this.slidesDivWidth && this.DeltaX > 0) {
      this.StoreWidth = (this.totalSlidesWidth) - this.slidesDivWidth
    } else if (this.StoreWidth - this.slidesDivWidth < 0 && this.DeltaX < 0) {
      this.StoreWidth = 0
    } else {
      this.StoreWidth = this.DeltaX > 0 ? this.StoreWidth + this.slidesDivWidth : this.StoreWidth - this.slidesDivWidth
    }
  }

  // sliderChangeBackgroundLoop() {
  //   // slider will change with full element width and it's loop slider
  //   this.SliderStatus = "End";
  //   this.currentSlide = this.DeltaX > 0 ? this.currentSlide + 1 : this.currentSlide - 1;
  //   this.StoreWidth = this.currentSlide * this.slidesDivWidth;
  //   this.DeltaX = 0;

  //   // if(this.currentSlide == 0 || this.currentSlide == this.SlideCount * 2 ){
  //   //   this.SliderStatus =='LoopChanage'
  //   //   this.StoreWidth = this.slidesDivWidth * this.SlideCount
  //   //   this.currentSlide = this.SlideCount
  //   // }
  //   setTimeout(() => {
  //     if (this.currentSlide == 0 || this.currentSlide == this.SlideCount * 2) {
  //       this.SliderStatus = 'LoopChanage'
  //       this.StoreWidth = this.slidesDivWidth * this.SlideCount
  //       this.currentSlide = this.SlideCount
  //     }
  //   }, 0);
  // }


}