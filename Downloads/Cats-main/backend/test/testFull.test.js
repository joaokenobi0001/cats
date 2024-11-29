const UserController = require('../controller/user');
const User = require('../model/user'); // Supondo que esse seja o caminho do seu modelo

// Mockando o modelo User
jest.mock('../model/user');

describe('User Access Rules', () => {
    const adminUser = { id: 1, role: 'admin' };
    const viewerUser = { id: 2, role: 'viewer' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Admin can create another admin', async () => {
        User.create.mockResolvedValue({ id: 3, role: 'admin' });
        
        const newUser = await UserController.createUser('Admin 2', 'admin2@example.com', 'password', adminUser);
        expect(newUser.role).toBe('admin');
    });

    test('Admin cannot create another admin without permission', async () => {
        await expect(UserController.createUser('Admin 2', 'admin2@example.com', 'password', viewerUser))
            .rejects
            .toThrow("Apenas administradores podem criar outros usuários.");
    });

    test('Admin can edit another user', async () => {
        User.findByPk.mockResolvedValue({
            id: 3,
            update: jest.fn().mockResolvedValue({ name: 'Updated Name' }),
            save: jest.fn()
        });
        
        const updatedUser = await UserController.update(3, 'Updated Name', 'updated@example.com', 'newpassword', adminUser);
        expect(updatedUser.name).toBe('Updated Name');
    });
    
    test('Viewer can update own data', async () => {
        User.findByPk.mockResolvedValue({
            id: viewerUser.id,
            isBlocked: false,
            update: jest.fn().mockResolvedValue({ name: 'Updated Viewer' }),
            save: jest.fn()
        });
        
        const updatedUser = await UserController.update(viewerUser.id, 'Updated Viewer', 'updatedviewer@example.com', 'newpassword', viewerUser);
        expect(updatedUser.name).toBe('Updated Viewer');
    });

    test('Blocked user cannot access information', async () => {
        User.findByPk.mockResolvedValue({ isBlocked: true });
        
        await expect(UserController.findUser(viewerUser.id)).rejects.toThrow("Usuário bloqueado.");
    });
    
    test('Viewer cannot edit another user', async () => {
        await expect(UserController.update(3, 'Updated Name', 'updated@example.com', 'newpassword', viewerUser))
            .rejects
            .toThrow("Você não tem permissão para editar este usuário.");
    });
    
    test('Admin can unblock a user', async () => {
        const userToUnblock = { isBlocked: true, save: jest.fn().mockResolvedValue() };
        User.findByPk.mockResolvedValue(userToUnblock);

        await UserController.unblockUser(3, adminUser);
        expect(userToUnblock.isBlocked).toBe(false);
        expect(userToUnblock.save).toHaveBeenCalled();
    });

    test('Admin can delete another user', async () => {
        User.findByPk.mockResolvedValue({ destroy: jest.fn() });
        
        await expect(UserController.delete(3, adminUser)).resolves.not.toThrow();
    });

    test('Viewer cannot delete another user', async () => {
        await expect(UserController.delete(3, viewerUser)).rejects.toThrow("Você não tem permissão para deletar este usuário.");
    });

    test('Admin can block a user', async () => {
        const userToBlock = { isBlocked: false, save: jest.fn().mockResolvedValue() };
        User.findByPk.mockResolvedValue(userToBlock);
        
        await UserController.blockUser(3, adminUser);
        expect(userToBlock.isBlocked).toBe(true);
        expect(userToBlock.save).toHaveBeenCalled();
    });

    test('Viewer cannot block a user', async () => {
        await expect(UserController.blockUser(3, viewerUser)).rejects.toThrow("Apenas administradores podem bloquear usuários.");
    });

    test('Viewer can delete own account', async () => {
        User.findByPk.mockResolvedValue({
            id: viewerUser.id,
            destroy: jest.fn(),
        });
        
        await expect(UserController.delete(viewerUser.id, viewerUser)).resolves.not.toThrow();
    });

    test('Viewer cannot delete another account', async () => {
        await expect(UserController.delete(3, viewerUser)).rejects.toThrow("Você não tem permissão para deletar este usuário.");
    });

    test('Active user can access information', async () => {
        User.findByPk.mockResolvedValue({ isBlocked: false, name: 'Active User' });
        
        const user = await UserController.findUser(viewerUser.id);
        expect(user.name).toBe('Active User');
    });
});
