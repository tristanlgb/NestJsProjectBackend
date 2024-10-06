// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module'; // Assuming you have a config module

@Module({
  imports: [
    ConfigModule, // Import your config module if you have one
    MongooseModule.forRoot(process.env.MONGO_URI), // Ensure process.env.MONGO_URI is set
    ProductsModule,
    CartsModule,
    UsersModule,
  ],
})
export class AppModule {}
