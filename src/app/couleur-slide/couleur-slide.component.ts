import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CouleurService } from '../couleur.service';
import { codeToRGB, ColorRGB,  RGBToCode } from '../tools';

@Component({
  selector: 'app-couleur-slide',
  templateUrl: './couleur-slide.component.html',
  styleUrls: ['./couleur-slide.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CouleurSlideComponent implements OnInit {
  readonly obsRGB: Observable<ColorRGB>;
  readonly obsCode: Observable<string>;

  constructor(private CS: CouleurService) {
    this.obsRGB = this.CS.colorObs.pipe(
      map( codeToRGB )
    );
    this.obsCode = this.CS.colorObs;
  }

  ngOnInit() {
  }

  update(u: Partial<ColorRGB>): void {
    this.CS.colorCode = RGBToCode({
      ...codeToRGB(this.CS.colorCode),
      ...u
    });
  }
}