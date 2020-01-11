import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { GraphQLModule } from '@nestjs/graphql';
import { SonglinkModule } from './songlink/songlink.module';
import { LinksModule } from './links/links.module';
// import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    SonglinkModule,
    LinksModule,
    // SpotifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
