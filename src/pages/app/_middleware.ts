import { withAuth } from 'next-auth/middleware';

// Middleware que vai ficar verificando a autenticação e redirecionar para paginas caso não esteja autenticado
export default withAuth({
    pages: {
        signIn: '/',
        error: '/',
    }
});