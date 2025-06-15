<template>
    <!-- partial:partials/_sidebar.html -->
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">

            <RouterLink class="sidebar-brand brand-logo" to="/"><img src="./images/logo.svg" alt="logo" /></RouterLink>

        </div>
        <ul class="nav">
            <li class="nav-item nav-category">
                <span class="nav-link">Navegação</span>
            </li>

            <li class="nav-item menu-items">
                <RouterLink class="nav-link" to="/">
                    <span class="menu-icon">
                        <i class="mdi mdi-home"></i>
                    </span>
                    Página Inicial
                </RouterLink>
            </li>

            <li class="nav-item menu-items">
                <RouterLink class="nav-link" to="/Emprestimo">
                    <span class="menu-icon">
                        <i class="mdi mdi-book-open"></i>
                    </span>
                    Emprestimo
                </RouterLink>
            </li>

            <li class="nav-item menu-items">
                <a class="nav-link" data-toggle="collapse" href="#cadastrar" aria-expanded="false"
                    aria-controls="cadastrar">
                    <span class="menu-icon">
                        <i class="mdi mdi mdi-plus-circle"></i>
                    </span>
                    <span class="menu-title">Cadastrar</span>
                    <i class="menu-arrow"></i>
                </a>

                <div class="collapse" id="cadastrar">
                    <ul class="nav flex-column sub-menu">

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/cadastrar/livro"> <span class="menu-icon">
                                    <i class="mdi mdi-book-plus"></i>
                                </span>Livros</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/cadastrar/leitor"><span class="menu-icon">
                                    <i class="mdi mdi-account-plus"></i>
                                </span>Leitores</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to=""><span class="menu-icon">
                                    <i class="mdi mdi-clipboard-account"></i>
                                </span>Funcionário</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/cadastrar/fornecedor"><span class="menu-icon">
                                    <i class="mdi mdi-cart-plus"></i>
                                </span>Fornecedor</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/cadastrar/estoque"><span class="menu-icon">
                                    <i class="mdi mdi-hexagon-outline"></i>
                                </span>Estoque</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/cadastrar/categoria"><span class="menu-icon">
                                    <i class="mdi mdi-code-equal"></i>
                                </span>Categoria</RouterLink>
                        </li>
                    </ul>
                </div>
            </li>

            <li class="nav-item menu-items">
                <a class="nav-link" data-toggle="collapse" href="#consultar" aria-expanded="false"
                    aria-controls="consultar">
                    <span class="menu-icon">
                        <i class="mdi mdi-magnify"></i>
                    </span>
                    <span class="menu-title">Consultar</span>
                    <i class="menu-arrow"></i>
                </a>

                <div class="collapse" id="consultar">
                    <ul class="nav flex-column sub-menu">

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/consultar/livro"> <span class="menu-icon">
                                    <i class="mdi mdi-book-open-page-variant"></i>
                                </span>Livros</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/consultar/leitor"><span class="menu-icon">
                                    <i class="mdi mdi-account"></i>
                                </span>Leitores</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to=""><span class="menu-icon">
                                    <i class="mdi mdi-clipboard-account"></i>
                                </span>Funcionário</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/consultar/fornecedor"><span class="menu-icon">
                                    <i class="mdi mdi-cart"></i>
                                </span>Fornecedor</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/consultar/estoque"><span class="menu-icon">
                                    <i class="mdi mdi-hexagon"></i>
                                </span>Estoque</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/consultar/categoria"><span class="menu-icon">
                                    <i class="mdi mdi-code-equal"></i>
                                </span>Categoria</RouterLink>
                        </li>

                    </ul>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'NavSidebar'
})
</script>
