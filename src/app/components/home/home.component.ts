import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent  {
  contactoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactoForm = this.fb.group({
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  // Función para enviar el formulario
  sendEmail(): void {
    if (this.contactoForm.valid) {
      emailjs
        .sendForm(
          'YOUR_SERVICE_ID', // Reemplázalo con tu Service ID de EmailJS
          'YOUR_TEMPLATE_ID', // Reemplázalo con tu Template ID de EmailJS
          this.contactoForm.value, // Los valores del formulario
          'YOUR_PUBLIC_KEY' // Reemplázalo con tu Public Key de EmailJS
        )
        .then(
          () => {
            alert('Mensaje enviado correctamente');
            this.contactoForm.reset(); // Resetear el formulario después de enviar
          },
          (error) => {
            console.error('Error al enviar:', error);
            alert('Hubo un problema al enviar el mensaje');
          }
        );
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}