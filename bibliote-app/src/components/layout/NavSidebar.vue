<template>
    <!-- partial:partials/_sidebar.html -->
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">

            <RouterLink class="sidebar-brand brand-logo" to="/"><img src="./images/logo.svg" alt="logo" /></RouterLink>

        </div>
        <ul class="nav">
            <li class="nav-item profile">
                <div class="profile-desc">
                    <div class="profile-pic">
                        <div class="count-indicator">
                            <img class="img-xs rounded-circle " src="./images/faces/face15.jpg" alt="">
                            <span class="count bg-success"></span>
                        </div>
                        <div class="profile-name">
                            <h5 class="mb-0 font-weight-normal">Henry Klein</h5>
                            <span>Gold Member</span>
                        </div>
                    </div>
                    <a href="#" id="profile-dropdown" data-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>
                    <div class="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list"
                        aria-labelledby="profile-dropdown">
                        <a href="#" class="dropdown-item preview-item">
                            <div class="preview-thumbnail">
                                <div class="preview-icon bg-dark rounded-circle">
                                    <i class="mdi mdi-settings text-primary"></i>
                                </div>
                            </div>
                            <div class="preview-item-content">
                                <p class="preview-subject ellipsis mb-1 text-small">Account settings</p>
                            </div>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item preview-item">
                            <div class="preview-thumbnail">
                                <div class="preview-icon bg-dark rounded-circle">
                                    <i class="mdi mdi-onepassword  text-info"></i>
                                </div>
                            </div>
                            <div class="preview-item-content">
                                <p class="preview-subject ellipsis mb-1 text-small">Change Password</p>
                            </div>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item preview-item">
                            <div class="preview-thumbnail">
                                <div class="preview-icon bg-dark rounded-circle">
                                    <i class="mdi mdi-calendar-today text-success"></i>
                                </div>
                            </div>
                            <div class="preview-item-content">
                                <p class="preview-subject ellipsis mb-1 text-small">To-do list</p>
                            </div>
                        </a>
                    </div>
                </div>
            </li>
            <li class="nav-item nav-category">
                <span class="nav-link">Navigation</span>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="index.html">
                    <span class="menu-icon">
                        <i class="mdi mdi-speedometer"></i>
                    </span>
                    <span class="menu-title">Dashboard</span>
                </a>
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
                            <RouterLink class="nav-link" to=""> <span class="menu-icon">
                                    <i class="mdi mdi-book-plus"></i>
                                </span>Livros</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/viewLeitor"><span class="menu-icon">
                                    <i class="mdi mdi-account-plus"></i>
                                </span>Leitores</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to=""><span class="menu-icon">
                                    <i class="mdi mdi-book-open"></i>
                                </span>Emprestimos</RouterLink>
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
                            <RouterLink class="nav-link" to=""> <span class="menu-icon">
                                    <i class="mdi mdi-book-open-variant"></i>
                                </span>Livros</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/viewLeitor"><span class="menu-icon">
                                    <i class="mdi mdi-account"></i>
                                </span>Leitores</RouterLink>
                        </li>

                        <li class="nav-item">
                            <RouterLink class="nav-link" to=""><span class="menu-icon">
                                    <i class="mdi mdi-book-open"></i>
                                </span>Emprestimos</RouterLink>
                        </li>

                    </ul>
                </div>
            </li>

            <li class="nav-item menu-items">
                <a class="nav-link" href="pages/forms/basic_elements.html">
                    <span class="menu-icon">
                        <i class="mdi mdi-playlist-play"></i>
                    </span>
                    <span class="menu-title">Form Elements</span>
                </a>
            </li>

            <li class="nav-item menu-items">
                <RouterLink class="nav-link" to="/viewLeitor">
                    <span class="menu-icon">
                        <i class="mdi mdi-table-large"></i>
                    </span>
                    <span class="menu-title">Tables</span>
                </RouterLink>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="pages/charts/chartjs.html">
                    <span class="menu-icon">
                        <i class="mdi mdi-chart-bar"></i>
                    </span>
                    <span class="menu-title">Charts</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" href="pages/icons/mdi.html">
                    <span class="menu-icon">
                        <i class="mdi mdi-contacts"></i>
                    </span>
                    <span class="menu-title">Icons</span>
                </a>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                    <span class="menu-icon">
                        <i class="mdi mdi-security"></i>
                    </span>
                    <span class="menu-title">User Pages</span>
                    <i class="menu-arrow"></i>
                </a>
                <div class="collapse" id="auth">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="pages/samples/blank-page.html"> Blank Page </a>
                        </li>
                        <li class="nav-item"> <a class="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                        <li class="nav-item"> <a class="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                        <li class="nav-item"> <a class="nav-link" href="pages/samples/login.html"> Login </a></li>
                        <li class="nav-item"> <a class="nav-link" href="pages/samples/register.html"> Register </a></li>
                    </ul>
                </div>
            </li>
            <li class="nav-item menu-items">
                <a class="nav-link"
                    href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html">
                    <span class="menu-icon">
                        <i class="mdi mdi-file-document-box"></i>
                    </span>
                    <span class="menu-title">Documentation</span>
                </a>
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