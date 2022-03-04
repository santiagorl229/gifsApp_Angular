import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'KfzLshRKQyjXUeBxa6jp0HzdwhRsvSHB';
  private _historial: string[]= [];
  public resultados: Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  buscarGifs(query: string=''){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=KfzLshRKQyjXUeBxa6jp0HzdwhRsvSHB&q=${query}}&limit=10`)
             .subscribe((resp)=>{
                 console.log(resp.data);
                 this.resultados =resp.data;
              });

      // this.http.get('https://postman-echo.com/delay/2')
      // .subscribe((resp: any)=>{
      //   console.log("Llamé al API");
      // });


  }
}
