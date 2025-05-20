import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

declare function createUnityInstance(
  canvas: HTMLCanvasElement,
  config: any,
  onProgress: (progress: number) => void
): Promise<any>;

@Component({
  selector: 'app-unity-game',
  templateUrl: './unity-game.component.html',
  styleUrls: ['./unity-game.component.css'],
  standalone: false
})
export class UnityGameComponent implements AfterViewInit {
  @ViewChild('webglContainer') webglContainer!: ElementRef;

  ngAfterViewInit(): void {
    const buildUrl = 'assets/unity/Build';

    const config = {
      dataUrl: buildUrl + '/WebGLBuild.data',
      frameworkUrl: buildUrl + '/WebGLBuild.framework.js',
      codeUrl: buildUrl + '/WebGLBuild.wasm',
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'TuEmpresa',
      productName: 'RetroCamisetas',
      productVersion: '1.0'
    };

    const canvas = document.querySelector('#unity-canvas') as HTMLCanvasElement;
    const loadingBar = document.querySelector('#unity-loading-bar') as HTMLElement;
    const progressBarFull = document.querySelector('#unity-progress-bar-full') as HTMLElement;
    const fullscreenBtn = document.querySelector('#unity-fullscreen-button') as HTMLElement;

    loadingBar.style.display = 'block';

    const script = document.createElement('script');
    script.src = buildUrl + '/WebGLBuild.loader.js'; // loader.js no está comprimido

    script.onload = () => {
      createUnityInstance(canvas, config, (progress: number) => {
        progressBarFull.style.width = `${100 * progress}%`;
      }).then((unityInstance) => {
        loadingBar.style.display = 'none';

        fullscreenBtn.addEventListener('click', () => {
          unityInstance.SetFullscreen(1);
        });
      }).catch((message) => {
        alert('Error al cargar el juego Unity: ' + message);
      });
    };

    this.webglContainer.nativeElement.appendChild(script);
  }
}
