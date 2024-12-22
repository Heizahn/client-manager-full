import { NodeSSH } from 'node-ssh';

interface ActionMikrotik {
	clientIp: string;
	clientUser: string;
	routerIp: string;
}

export async function suspendMK(mk: ActionMikrotik) {
	const ssh = new NodeSSH();

	try {
		await ssh.connect({
			host: mk.routerIp,
			username: process.env.MK_USER,
			password: process.env.MK_PASS,
			port: Number(process.env.MK_PORT),
		});
		await ssh.execCommand(
			`/ip firewall address-list add address=${mk.clientIp} list=MOROSOS comment="${mk.clientUser}"`,
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		ssh.dispose();
	}
}

export async function reactivateMK(mk: ActionMikrotik) {
	const ssh = new NodeSSH();

	try {
		await ssh.connect({
			host: mk.routerIp,
			username: process.env.MK_USER,
			password: process.env.MK_PASS,
			port: Number(process.env.MK_PORT),
		});
		await ssh.execCommand(
			`/ip firewall address-list remove [find address=${mk.clientIp} list=MOROSOS]`,
		);
	} catch (error) {
		throw new Error(error);
	} finally {
		ssh.dispose();
	}
}
