export type ShowAlertParams = {
  timeout?: number;
};

export class Result {
  // İşlem true ise başarılı false ise hatalı
  process = false;
  // Mesajın kendisi
  message = '';

  // Mesajın ne kadar süre ile ekranda kalacağı
  timeout(timeout = 3000): Promise<void> {
    // Promise olarak dönüyorum bazen işlemin bitmesini bekleyebiliriz
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        // Sıfırla
        this.process = false;
        this.message = '';
        resolve();
      }, timeout)
    );
  }

  // Hata mesajı
  async showErrorAlert(
    message: string,
    { timeout = 3000 }: ShowAlertParams = {}
  ): Promise<void> {
    this.process = false;
    this.message = message;

    // Mesaj için süre tanı
    await this.timeout(timeout);
  }

  // Başarı Mesajı
  async showSuccessAlert(
    message: string,
    { timeout = 1000 }: ShowAlertParams = {}
  ): Promise<void> {
    this.process = true;
    this.message = message;

    // Mesaj için süre tanı
    await this.timeout(timeout);
  }
}
