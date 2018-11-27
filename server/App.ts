import * as express from 'express';
import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';


class App {
  public express;
  private sequelize;


  constructor(){
    this.express = express();
    this.enableCors();
    this.enablePublic();
  
  }

  private enableCors(): void {
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      next();
    });
  }

  private enablePublic(): void{
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(express.static('dist_client'));

  }



  public async listen(port:number) {
    await this.express.listen(port);
    console.log("Servidor activo en puerto " + port);
  }

}

export default App;
