import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './context/auth-context';
import ProtectedRoute from './hooks/protected-route';
import Clients from './pages/clients';
import LayoutPrincipal from './components/Layout/layout-principal';
import NotFound from './pages/not-found';
import ClientDetail from './pages/client-detail';
import Services from './pages/services';
import Sectors from './pages/sectors';
import LayoutPage from './components/Layout/layout-page';
import Routers from './pages/routers';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route
						element={
							<LayoutPrincipal>
								<ProtectedRoute />
							</LayoutPrincipal>
						}
					>
						<Route path='/' element={<Dashboard />} />
						<Route path='/clients' element={<Clients />} />
						<Route path='/client/:id' element={<ClientDetail />} />
						<Route
							path='/services'
							element={
								<LayoutPage title='Servicios'>
									<Services />
								</LayoutPage>
							}
						/>
						<Route
							path='/sectors'
							element={
								<LayoutPage title='Sectores'>
									<Sectors />
								</LayoutPage>
							}
						/>
						<Route
							path='/routers'
							element={
								<LayoutPage title='Routers'>
									<Routers />
								</LayoutPage>
							}
						/>
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
