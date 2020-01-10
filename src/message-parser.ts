import axios from 'axios';

export class MessageParser {
  message: string;
  isMessageHasUrls: boolean = false;
  messageUrls: string[] = [];
  urlRegExp: RegExp = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
  shazamUrl: string = 'https://www.shazam.com/discovery/v4/ru/US/web/-/track/';

  constructor(message: string) {
    this.message = message;
  }

  private findShazamSongIdFromShazamLink(shazamLink: string): number {
    const [shazamLinkId] = shazamLink.split('/').filter((pathPart: any) => {
      return !isNaN(pathPart) && pathPart !== ''
    });
    return +shazamLinkId;
  }

  private async replaceShazamLinkToSongLink(url: string, index: number) {
    const shazamSongId = this.findShazamSongIdFromShazamLink(url)

    await axios(String(shazamSongId), {
      baseURL: this.shazamUrl,
    })
      .then(res => {
        if (res.data) {
          const linkFromShazamRes =
          res?.data?.hub?.options?.apple?.openin?.actions[0]?.uri ||
          res?.data?.hub?.options?.spotify?.openin?.actions[0]?.uri;

          if (linkFromShazamRes) {
            this.messageUrls.splice(index, 1, linkFromShazamRes);
          } else {
            this.messageUrls = this.messageUrls.filter((_, idx: number) => idx !== index)
          }
        } else {
          this.messageUrls = this.messageUrls.filter((_, idx: number) => idx !== index)
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  public async findUrlsInMessage() {
    const messageUrls = this.message.match(this.urlRegExp);

    if (messageUrls) {
      this.messageUrls = messageUrls;
      this.isMessageHasUrls = true;

      /* Detect Shazam URL's */
      for (const [index, url] of this.messageUrls.entries()) {
        if (url.match(/shazam.com/)) {
          await this.replaceShazamLinkToSongLink(url, index);
        }
      }
    }
  }
}

export default MessageParser;
