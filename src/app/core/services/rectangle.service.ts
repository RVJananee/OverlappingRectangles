import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IRectangle } from 'src/app/shared/model/rectangle.model';
import { CONFIG } from 'src/app/shared/config';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { APP_CONSTANTS } from 'src/app/shared/constants';
import { ICoOrdinates } from 'src/app/shared/model/co-ordinates.model';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RectangleService {

  constructor(private http: HttpClient) { }

  calculate(points: string) {
    const coordinatesObject = this.buildPayload(points);
    return this.http.post<IRectangle[]>(
      CONFIG.baseServerUrl + CONFIG.endpoints.rectangle,
      coordinatesObject)
      .pipe(
          map((res: IRectangle[]) => {
            return res;
          }),
          catchError(this.handleError)
      );
  }

  buildPayload(input): ICoOrdinates[] {
    const coordinates = input.split('\n');
    const mappedCoordinates: ICoOrdinates[] = [];
    _.every(coordinates, (rectangleCoordinate: string) => {
        const points = rectangleCoordinate.split(',');
        // Initialize
        let coordinate: ICoOrdinates = {
          top: undefined,
          left: undefined,
          bottom: undefined,
          right: undefined
        };
        if (points.length > 3) {
          _.every(points, (point, index) => {
            coordinate = this.setCoordinates(index, coordinate, points);
            return coordinate;
          });
          mappedCoordinates.push(coordinate);
        }
        return mappedCoordinates;
    });
    return mappedCoordinates;
  }

  private setCoordinates(index: any, coordinate: ICoOrdinates, coordinates: string[]): ICoOrdinates {
    switch (index) {
      case 0:
        coordinate = {
          top: Number(coordinates[index]),
          left: undefined,
          bottom: undefined,
          right: undefined
        };
        break;
      case 1:
        coordinate = {
          top: coordinate.top,
          left: Number(coordinates[index]),
          bottom: coordinate.bottom,
          right: coordinate.right
        };
        break;
      case 2:
        coordinate = {
          top: coordinate.top,
          left: coordinate.left,
          bottom: Number(coordinates[index]),
          right: coordinate.right
        };
        break;
      case 3:
        coordinate = {
          top: coordinate.top,
          left: coordinate.left,
          bottom: coordinate.bottom,
          right: Number(coordinates[index]),
        };
        break;
      default:
        break;
    }
    return coordinate;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(APP_CONSTANTS.ERRORS.SERVER_ERROR + ': ', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return throwError(errMessage);
    }
    return throwError(error || APP_CONSTANTS.ERRORS.SERVER_ERROR);
  }
}
