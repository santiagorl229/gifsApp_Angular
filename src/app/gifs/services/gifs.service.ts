import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!)|| [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)|| [];
  }

  buscarGifs(query: string=''){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=KfzLshRKQyjXUeBxa6jp0HzdwhRsvSHB&q=${query}}&limit=10`)
             .subscribe((resp)=>{
                 console.log(resp.data);
                 this.resultados =resp.data;
                 localStorage.setItem('resultados', JSON.stringify(this.resultados));
              });

      // this.http.get('https://postman-echo.com/delay/2')
      // .subscribe((resp: any)=>{
      //   console.log("Llamé al API");
      // });


  }
}
