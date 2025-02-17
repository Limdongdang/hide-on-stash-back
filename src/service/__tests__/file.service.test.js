import fileService from '../file.service';
import { File } from '../../model/file.model';

// Mock the File model
jest.mock('../../model/file.model');

describe('File Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getFiles는 모든 파일을 반환해야 합니다', async () => {
        const mockFiles = [
            { id: 1, originalname: 'file1', filename: 'file1-123', path: 'path1', size: '1MB', mimetype: 'image/png' },
            { id: 2, originalname: 'file2', filename: 'file2-123', path: 'path2', size: '2MB', mimetype: 'image/jpeg' }
        ];
        File.findAll.mockResolvedValue(mockFiles);

        const files = await fileService.getFiles();
        expect(files).toEqual(mockFiles);
        expect(File.findAll).toHaveBeenCalledTimes(1);
    });

    test('uploadFile은 파일을 생성해야 합니다', async () => {
        const mockFile = {
            originalname: 'file1',
            path: 'path1',
            size: '1MB',
            mimetype: 'image/png'
        };
        const mockCreatedFile = {
            ...mockFile,
            id: 1,
            filename: 'file1-123'
        };
        File.create.mockResolvedValue(mockCreatedFile);

        await fileService.uploadFile(mockFile);
        expect(File.create).toHaveBeenCalledWith(expect.objectContaining({
            originalname: 'file1',
            filename: expect.any(String),
            path: 'path1',
            size: '1MB',
            mimetype: 'image/png'
        }));
        expect(File.create).toHaveBeenCalledTimes(1);
    });
});