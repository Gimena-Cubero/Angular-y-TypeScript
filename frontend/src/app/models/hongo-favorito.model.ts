// pues esto va a crear la clase propia -- sera para administrar la nota de favoritos
// que ya el codigo lo tiene si, que ya funciona tambien si - pero el profe pide una clase y ya que

export class HongoFavorito {
    constructor(
        public taxonId: number,
        public nota: string
    ) {}

    //metodo
    //pues esta cosa actualiz la nota para que quede la new new
    actualizarNota(nuevaNota: string): void {
        this.nota = nuevaNota.trim();
        //this nota -- este objeto
    }
}